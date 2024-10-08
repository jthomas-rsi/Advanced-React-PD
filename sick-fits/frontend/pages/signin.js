import styled from 'styled-components';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import RequestReset from '../components/RequestReset';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const SignInPage = () => (
  <GridStyles>
    <SignIn />
    <SignUp />
    <RequestReset />
  </GridStyles>
);

export default SignInPage;
