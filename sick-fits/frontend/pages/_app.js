/* eslint-disable react/jsx-props-no-spreading */

// This file has a "_" preceding it's name because it is globally applied to all pages in the app.

import PropTypes from 'prop-types';
import PageComponent from '../components/PageComponent';

const MyApp = ({ Component, pageProps }) => (
  <PageComponent>
    <Component {...pageProps} />
  </PageComponent>
);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
