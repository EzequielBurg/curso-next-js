import { GetServerSideProps } from 'next';
import SEO from '../components/SEO';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <SEO title="Devcommerce, yout best E-commerce!" shouldExcludeTitleSuffix />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
};
