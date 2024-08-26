/* eslint-disable */
import { OrderCreateInput } from '../.keystone/schema-types';
import { KeystoneContext, SessionStore } from '@keystone-next/types';




interface Arguments {
  token: string;
}

const graphql = String.raw;

const checkout = async (
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> => {
  // 1. make sure user is signed in 
  const userId = context.session.itemId;
  if(!userId) throw new Error('Sorry! You must be signed in to create an order!');
  // 1.5 query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields:graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `
  });

  console.dir(user, {depth: null})
  // 2. calculate the total price for their order
  // 3. create the charge with the stripe library
  // 4. convert the cart items to order items
  // 5. create the order and return it - save it in the database
  return {};
};

export default checkout;
