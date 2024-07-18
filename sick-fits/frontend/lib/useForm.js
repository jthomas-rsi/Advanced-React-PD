import { useState } from 'react';

// this function is a hook to handle from data without using third party library
const useForm = (initial = {}) => {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // this function will allow us to update the state of the form
  const handleChange = (e) => {
    setInputs({
      // copy the existing state
      ...inputs,
      // update the state with the new data using form input name attribute
      [e.target.name]: e.target.value,
    });
  };

  // return the values of the form and the data handling functions
  return {
    inputs,
    handleChange,
  };
};

export default useForm;
