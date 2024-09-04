import { text, integer, relationship, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import formatMoney from '../lib/formatMoney';
import { isSignedIn } from '../access';

export const Order = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver: (item: { total: number }) =>
        `Order: ${formatMoney(item.total)}`,
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }), // order item will only relate to one order
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
