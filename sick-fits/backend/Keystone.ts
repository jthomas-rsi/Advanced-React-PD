import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';
import { KeystoneConfig } from '@keystone-next/types';
import { User } from './schemas/User';

// TODO fix this type so it works with isAccessAllowed function in UI of configuration object
type KeystoneSessionInformation = {
  listKey: string;
  itemId: string;
  data: { id: string; name: string; email: string }[];
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
    // TODO Add data seeding here
  },
  lists: createSchema({
    // Schema items go in here
    User,
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
