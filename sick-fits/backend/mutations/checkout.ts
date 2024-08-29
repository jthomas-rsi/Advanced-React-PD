/* eslint-disable */
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import stripeConfig from '../lib/stripe';




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
const cartItems = user.cart.filter(cartItem => cartItem.product);

const amount = cartItems.reduce(function(tally: number, cartItem: CartItemCreateInput & { product: { price: number } }){
  return tally + cartItem.quantity * cartItem.product.price;
}, 0)
console.log({amount})
  // 3. create the charge with the stripe library

  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true, // confirm the payment right away and not need to revisit the site after completing payment information 
    payment_method: token,
  }).catch(err => {
    console.log(err)
    throw new Error(err.message)
  });

  console.log({charge})

  // 4. convert the cart items to order items
  const orderItems = cartItems.map(cartItem => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } } // we created a relationship between the orderItem and an existing photo
    }
    return orderItem;
  })
  // 5. create the order and return it - save it in the database
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems }, // automatically creates an array of order items in same api call
      user: { connect: { id: userId } }
    }
  });

  // .6 clean up any old cart items
  const cartItemIds = user.cart.map(cartItem => cartItem.id);
  
  // delete all existing the cart items
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds
  });

  return order;
};

export default checkout;
