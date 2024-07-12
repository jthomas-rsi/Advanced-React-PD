import { text, select, integer } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Product = list({
  // TODO
  // access
  fields: {
    // list the fields to be rendered in the UI of the Keystone admin for created products
    name: text({ isRequired: true }), // text input field
    description: text({
      // text area field
      ui: {
        displayMode: 'textarea',
      },
    }),
    status: select({
      // dropdown field
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Draft', value: 'AVAILABLE' },
        { label: 'Draft', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT', // setting default value of sataus dropdown to DRAFT
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    price: integer(), // integer input field
  },
});
