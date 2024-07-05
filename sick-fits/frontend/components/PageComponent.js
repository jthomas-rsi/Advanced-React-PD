import PropTypes from 'prop-types';

const PageComponent = ({ children }) => (
  <div>
    <h1>Page Component</h1>
    {children}
  </div>
);

PageComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageComponent;
