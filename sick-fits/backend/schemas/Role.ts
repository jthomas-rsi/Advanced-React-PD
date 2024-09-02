import { list } from '@keystone-next/keystone/schema';
import { relationship, text } from '@keystone-next/fields';
import { permissionFields } from './fields';

export const Role = list({
  fields: {
    name: text({ isRequired: true }),
    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role', // TODO: Add this to the User
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
  },
  //   access: {
  //     create: permissions.canManageRoles,
  //     read: permissions.canManageRoles,
  //     update: permissions.canManageRoles,
  //     delete: permissions.canManageRoles,
  //   },
  //   ui: {
  //     hideCreate: (args) => !permissions.canManageRoles(args),
  //     hideDelete: (args) => !permissions.canManageRoles(args),
  //     isHidden: (args) => !permissions.canManageRoles(args),
  //   },
});
