import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

// query to fetch single product to update
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
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  // create initial state for the update form
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // call the createProduct mutation
    const res = await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
      },
    }).catch(console.error);

    console.log(res);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            defaultValue="name"
            value={inputs.name}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            defaultValue={0}
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            defaultValue="description"
            value={inputs.description}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};

UpdateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateProduct;
