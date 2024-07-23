import { useState } from 'react';

// this function is a hook to handle from data without using third party library
const useForm = (initial = {}) => {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // this function will allow us to update the state of the form
  const handleChange = (e) => {
    // destructure variables from the event object
    let { value, name, type } = e.target;

    // if value is a number then parse it to a float
    if (type === 'number') value = parseFloat(value);

    // file uploads are of the array type and must access at the 0 index
    if (type === 'file') {
      // destructure the image from the files array
      const [imageUpload] = e.target.files;
      // set the value to the uploaded image
      value = imageUpload;
    }
    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      // copy the existing state
      ...inputs,
      // update the state with the new data using form input name attribute
      [name]: value,
    });
  };

  // this function will reset the form to the initial state values
  const resetForm = () => {
    setInputs(initial);
  };

  // this function will clear the form of all data
  const clearForm = () => {
    // create an array of keys from the initial state object
    // set the value of each key to an empty string
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );

    // set the state to the blank state
    setInputs(blankState);
  };

  // return the values of the form and the data handling functions
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};

export default useForm;
