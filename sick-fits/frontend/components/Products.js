import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Product from './Product';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

// create graphql query string for fetching products
// TODO create separate folder with files for all queries and mutations
export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
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

const Products = (page) => {
  // useQuery hook to fetch data from the server
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

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
Products.propType = {
  page: PropTypes.number,
};

export default Products;
