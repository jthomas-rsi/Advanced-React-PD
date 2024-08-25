import { text, select, integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const OrderItem = list({
  fields: {
    name: text({ isRequired: true }), // text input field
    description: text({
      // text area field
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      // relationship field
      ref: 'ProductImage.product', // relationship to ProductImage schema
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
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
