/* eslint-disable react/jsx-props-no-spreading */

// This file has a "_" preceding it's name because it is globally applied to all pages in the app.

// The NProgress library is used to show a progress bar on the top of the page when navigating between pages.
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';

import PropTypes from 'prop-types';
import Router from 'next/router';
import PageComponent from '../components/PageComponent';

// router event listener to show progress bar on route change
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
