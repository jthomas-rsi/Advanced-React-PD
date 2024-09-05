import 'dotenv/config';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, permissions } from '../access';

export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'sickfits',
};

export const ProductImage = list({
  access: {
    create: isSignedIn, // anyone signed in can create a product image
    read: () => true,
    update: permissions.canManageProducts, // only people with canManageProducts permission can update
    delete: permissions.canManageProducts, // only people with canManageProducts permission can delete
  },
  fields: {
    image: cloudinaryImage({
      cloudinary: cloudinaryConfig,
      label: 'Source',
    }),
    altText: text(),
    product: relationship({ ref: 'Product.photo' }), // relationship to Product schema
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'product'],
    },
  },
});
