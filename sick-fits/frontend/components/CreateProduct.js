import { useState } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # variables for the mutation
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

const CreateProductComponent = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: 'Cool James',
    price: 12345,
    description: 'This is a really cool guy',
  });

  // utilize useMutation method to run mutation to create a new product via the form
  // deconstruct the return payload from useMutation hook
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      // set the refetch conditions to refetch the products query after creating a new product
      // this will update the products list with the new product immediately
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // call the createProduct mutation
    const res = await createProduct();

    // clear the form after creating a new product
    resetForm();

    // once data is created, redirect user to products page
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
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
            value={inputs.description}
          />
        </label>
        <button type="submit" onClick={() => {}}>
          + Add Product
        </button>
      </fieldset>
    </Form>
  );
};

export default CreateProductComponent;
