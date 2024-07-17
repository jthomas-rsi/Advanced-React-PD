/* eslint-disable react/jsx-props-no-spreading */

// This file has a "_" preceding it's name because it is globally applied to all pages in the app.

// The NProgress library is used to show a progress bar on the top of the page when navigating between pages.
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';

import PropTypes from 'prop-types';
import Router from 'next/router';
import { ApolloClient } from '@apollo/client';
import PageComponent from '../components/PageComponent';
// withData is a HOC that will provide the ApolloClient instance to all components in our app.
// much like a context provider, but for ApolloClient.
import withData from '../lib/withData';

// router event listener to show progress bar on route change
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps, apollo }) => (
  <ApolloClient client={apollo}>
    <PageComponent>
      <Component {...pageProps} />
    </PageComponent>
  </ApolloClient>
);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  apollo: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // This exposes the query to the user
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
