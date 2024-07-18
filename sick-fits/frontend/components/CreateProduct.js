import { useState } from 'react';

const CreateProduct = () => {
  const [name, setName] = useState('');

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
    </form>
  );
};

export default CreateProduct;
