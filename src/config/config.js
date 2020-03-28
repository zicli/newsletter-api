import env from './env';


module.exports = {
  production: {
    url: env.DATABASE_PRO,
    dialect: 'postgres',
  },

  development: {
    url: env.DATABASE_DEV || env.LOCAL_URL,
    dialect: 'postgres',
  },

  test: {
    url: env.DATABASE_TEST || env.LOCAL_URL,
    dialect: 'postgres',
  },
};
