import PropTypes from 'prop-types';
import SingleProduct from '../../components/SingleProduct';

const SingleProductPage = ({ query }) => {
  const { id } = query;

  return <SingleProduct id={id} />;
};

SingleProductPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default SingleProductPage;
