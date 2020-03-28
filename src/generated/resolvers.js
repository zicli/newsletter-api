import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env';

const { ADMIN_KEY, SECRET } = env;

const resolvers = {
  Query: {
  },

  Mutation: {
    /**
     * @param {object} parent - graphql parent object
     * @param {object} data - graphql input data
     * destructured { username, email, password, firstName, lastName }
     * @param {object} models - database model
     * @returns {object} user - The user object
     */
    signup: async (parent,
      {
        username,
        email,
        password,
        firstName,
        lastName,
        adminKey
      }, { req, models }) => {
      // check if user with email and password already exists
      let member = await models.Admin.findOne({ where: { username } });
      if (member) throw new Error('username is taken');
      member = await models.Admin.findOne({ where: { email } });
      if (member) throw new Error('Admin with email exists');
      // check admin key
      if (adminKey !== ADMIN_KEY) throw new Error('Invalid admin key');
      // hash admin password
      const hashedPassword = await bcrypt.hash(password, 10);
      // add admin to database
      const { dataValues: admin } = await models.Admin.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword
      });
      // create token for user and add to response
      const token = jwt.sign({
        id: admin.id,
        email: admin.email
      }, SECRET, { expiresIn: '3d' });
      req.res.cookie('token', token, { maxAge: 70000000, httpOnly: true });
      return admin;
    },
  },
};

module.exports = resolvers;
