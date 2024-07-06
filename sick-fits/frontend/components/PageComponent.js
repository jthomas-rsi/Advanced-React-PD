import PropTypes from 'prop-types';
import Header from './Header';

const PageComponent = ({ children }) => (
  <div>
    <Header />
    <h1>Page Component</h1>
    {children}
  </div>
);

PageComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageComponent;
