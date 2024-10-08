import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Head from 'next/head'; // allows us to update the tab title for each product page
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const SingleProduct = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <DisplayError error={error} />;

  const { Product } = data;

  return (
    <ProductStyles data-testid="singleProduct">
      <Head>
        <title>{Product.name} | Sick Fits</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
};

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SingleProduct;
