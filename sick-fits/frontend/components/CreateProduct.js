import { useState } from 'react';
import useForm from '../lib/useForm';

const CreateProduct = () => {
  const { inputs, handleChange } = useForm({
    name: 'Cool James',
    price: 12345,
    description: 'This is a really cool guy',
  });

  return (
    <form>
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
          type="text"
          id="price"
          name="price"
          placeholder="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={inputs.description}
        />
      </label>
    </form>
  );
};

export default CreateProduct;
