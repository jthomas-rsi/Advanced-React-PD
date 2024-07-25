import PropTypes from 'prop-types';
import UpdateProduct from '../components/UpdateProduct';

const UpdatePage = ({ query }) => {
  const { id } = query;
  return <UpdateProduct id={id} />;
};

UpdatePage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default UpdatePage;
