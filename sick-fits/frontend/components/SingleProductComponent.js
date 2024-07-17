import PropTypes from 'prop-types';

const Product = ({ productData }) => (
  <div>
    <p>{productData.name}</p>
  </div>
);

Product.propTypes = {
  productData: PropTypes.object.isRequired,
};

export default Product;
