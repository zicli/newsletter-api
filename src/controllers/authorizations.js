import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { Toolbox } from '../utils';

const { ADMIN_KEY, SECRET } = env;
const { errors } = Toolbox;

const Authorizations = {

  /**
   * query current admin user
   * @param {object} parent - graphql parent object
   * @param {object} args - graphql input data
   * @param {object} data - graphql input data
   * destructured { email, password }
   * @param {object} models - database model
   * @returns {object} user - The user object
   */
  async currentUser(parent, args, { req, admin, models }) {
    if (!admin) errors(req.res, 'Not Authorized', 403);
    return models.Admin.findOne({ where: { id: admin.id } });
  },

  /**
   * admin signup
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
    let member = await models.Admin.findOne({ where: { username } });
    if (member) errors(req.res, 'username is taken', 400);
    member = await models.Admin.findOne({ where: { email } });
    if (member) errors(req.res, 'Admin with email exists', 409);
    if (adminKey !== ADMIN_KEY) throw new Error('Invalid admin key');
    const hashedPassword = await bcrypt.hash(password, 10);
    const { dataValues: admin } = await models.Admin.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword
    });
    const token = jwt.sign({
      id: admin.id,
      email: admin.email
    }, SECRET, { expiresIn: '3d' });
    admin.token = token;
    req.res.cookie('token', token, { maxAge: 70000000, httpOnly: true });
    return admin;
  },
  /**
   * admin login
   * @param {object} parent - graphql parent object
   * @param {object} data - graphql input data
   * destructured { email, password }
   * @param {object} models - database model
   * @returns {object} user - The user object
   */
  async login(parent, { email, password }, { req, models }) {
    const admin = await models.Admin.findOne({ where: { email } });
    if (!admin) errors(req.res, 'invalid login details', 400);
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) errors(req.res, 'invalid login details', 400);
    const token = jwt.sign({
      id: admin.id,
      email: admin.email
    }, SECRET, { expiresIn: '3d' });
    admin.token = token;
    req.res.cookie('token', token, { maxAge: 70000000, httpOnly: true });
    return admin;
  },

};

export default Authorizations;
