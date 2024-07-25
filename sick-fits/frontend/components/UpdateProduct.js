import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { SINGLE_PRODUCT_QUERY } from './SingleProduct';

// create a nutation to update the product
const UPDATE_PRODUCT_MUTATION = gql`
mutation UPDATE_PRODUCT_MUTATION(
  $id: ID!
  $name: String
  $description: String
  $price: Int
) {
  updateProduct(
    id: $id
    data: { name: $name, description: $description, price: $price }
  ) {
    id
    name
    description
    price
  }
`;

// create a form to update the product

const UpdateProduct = ({ id }) => {
  // fetch the product by id using previously made query SINGLE_PRODUCT_QUERY
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  // use mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      // TODO pass in the updated values
    },
  });

  return (
    <div>
      <p>UpdateProduct</p>
      {id}
    </div>
  );
};

UpdateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateProduct;
