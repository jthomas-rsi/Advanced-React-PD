import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';
import paginationField from './paginationField';

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      // Error handling for your GraphQL requests
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      // this package allows us to do file uploads
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          // include credentials so we can send the cookie with the request for the logged in user
          credentials: 'include',
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers, // this is the headers from the server which allows us to render on the server side with the logged in user
      }),
    ]),
    // This data is stored in the Apollo cache. This is useful for when we want to store data in the cache and then retrieve it later
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });
// withApollo is a higher order component that wraps our App component.
// It will make the ApolloClient available to all of our components in our app.
// It will also make sure that the data is fetched and rendered on the server before the page is served to the client. This is important for SEO and performance reasons.
