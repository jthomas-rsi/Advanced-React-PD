import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';
import { KeystoneConfig } from '@keystone-next/types';
import { User } from './schemas/User';
import { Product } from './schemas/Products';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';

// TODO fix this type so it works with isAccessAllowed function in UI of configuration object
type KeystoneSessionInformation = {
  listKey: string;
  itemId: string;
  data: typeof User[];
};

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

// authorization function
const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO Add in initial roles here
  },
  passwordResetLink: {
    async sendToken(args) {
      // send user reset email response
      const { identity, token } = args;
      await sendPasswordResetEmail(token, identity);
    },
  },
});

// Keystone configuration object
const configObject: KeystoneConfig = {
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    onConnect: async (keystone) => {
      console.log('Connected to the database');
      if (process.argv.includes('--seed-data')) {
        // if seed-data flag is passed in terminal load db with seed data
        await insertSeedData(keystone);
      }
    },
  },
  lists: createSchema({
    // Schema items go in here
    User,
    Product,
    ProductImage,
  }),
  ui: {
    // Show the UI only for people who pass this test
    isAccessAllowed: ({ session }) =>
      //   console.log(session);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      Boolean(session?.data),
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: 'id name email',
  }),
};

// configuration constructor wrapped with authentication function providing authorization security
export default withAuth(config(configObject));
