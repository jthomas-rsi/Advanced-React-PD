import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query GetUser {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # TODO: Query the cart once we have it
        # cart {
        #   id
        #   quantity
        #   product {
        #     id
        #     price
        #     name
        #     description
        #     photo {
        #       image {
        #         publicUrlTransformed
        #       }
        #     }
        #   }
        # }
      }
    }
  }
`;

export const useUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
};
