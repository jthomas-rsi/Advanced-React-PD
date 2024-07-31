import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import DisplayError from './ErrorMessage';

// create graphql query string for fetching products
// TODO create separate folder with files for all queries and mutations
export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const Products = () => {
  // useQuery hook to fetch data from the server
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);

  // console.log('query data', data, error, loading);

  // create conditional rendering for loading and error states
  if (loading) <>Loading ...</>;
  if (error) <DisplayError error={error} />;

  return (
    <div>
      <ProductsListStyles>
        {data &&
          data.allProducts.map((product) => (
            <Product key={product.id} productData={product} />
          ))}
      </ProductsListStyles>
    </div>
  );
};

export default Products;
