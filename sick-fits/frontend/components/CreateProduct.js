import { useState } from 'react';
import useForm from '../lib/useForm';
import Form from './styles/Form';

const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: 'Cool James',
    price: 12345,
    description: 'This is a really cool guy',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    resetForm();
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <label htmlFor="name">
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

export default CreateProduct;
