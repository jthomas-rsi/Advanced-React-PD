import PropTypes from 'prop-types';
import { useUser } from './User';
import SingIn from './SignIn';

const PleaseSignIn = ({ children }) => {
  const me = useUser();
  if (!me) return <SingIn />;
  return children;
};

PleaseSignIn.propTypes = {
  children: PropTypes.any,
};
export default PleaseSignIn;
