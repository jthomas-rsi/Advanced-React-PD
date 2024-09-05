/* eslint-disable @typescript-eslint/unbound-method */
import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissions, rules } from '../access';

export const User = list({
  access: {
    create: () => true, // anyone can create a user
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    // only people with the permission canManageUsers can delete themselves
    delete: permissions.canManageUsers,
  },
  ui: {
    // hide the backend UI from regular users
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    cart: relationship({
      ref: 'CartItem.user',
      many: true, // one user can have many cart items
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    orders: relationship({ ref: 'Order.user', many: true }),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers, // limit the access to those who can create a new role
        update: permissions.canManageUsers, // limit the access to those who can update a role
      },
    }),
    products: relationship({
      // create a relationship between the user and the products they create
      ref: 'Product.user',
      many: true,
    }),
  },
});
