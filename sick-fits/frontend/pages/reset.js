import PropTypes from 'prop-types';
import RequestReset from '../components/RequestReset';

const ResetPage = ({ query }) => {
  console.log(query);
  const { token } = query;

  if (!query?.token) {
    return (
      <>
        <p> Sorry you must supply a token </p>
        <RequestReset />
      </>
    );
  }

  return (
    <div>
      <p>Reset Your Password {query.token}</p>
    </div>
  );
};

ResetPage.propTypes = {
  query: PropTypes.object,
};

export default ResetPage;
