import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from 'next/dynamic';

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

const AddToCartModal = dynamic(
  () => import('../../../components/AddToCartModal'),
  { loading: () => <p>Loading ...</p> }
);

export default function Category({ products }: CategoryProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  function handleAddToCart() {
    setShowModal(true);
  }

  if (router.isFallback) {
    return <p>Carregando ...</p>
  }

  return (
    <div>
      <h1>Categoria: {router.query.slug}</h1>

      <ul>
        {products.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      <button onClick={handleAddToCart}>Add to cart</button>

      {showModal && <AddToCartModal />}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3333/categories');
  const categories = await response.json();

  const paths = categories.map(item => {
    return {
      params: { slug: item.id }
    }
  });

  return {
    paths,
    fallback: true
  }
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
  const products = await response.json();

  return {
    props: { products },
    revalidate: 60
  }
};
