import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';

const SINGLE_PRODUCT_QUERY = gql`
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

  if (error) return <DisplayError />;

  const { Product } = data;

  console.log({ Product });

  return (
    <div>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </div>
  );
};

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SingleProduct;
