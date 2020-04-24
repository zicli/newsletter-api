
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { Toolbox } from '../utils';

const { ADMIN_KEY, SECRET } = env;
const { errors } = Toolbox;

const Newsletters = {

  /**
   * query all post in the database
   * @param {object} parent - graphql parent object
   * @param {object} args - graphql input data
   * @param {object} models - database model
   * @returns {array} post - The post array
   */
  async getAllNewsletters(parent, args, { models }) { models.Post.findAll({}); },

  /**
   * query one simgle post
   * @param {object} parent - graphql parent object
   * @param {object} args - graphql input data
   * @param {object} models - database model
   * @returns {array} post - The post array
   */
  async getOneNewsletter(parent, { id }, { req, models }) {
    const post = await models.Post.findOne({ where: { id } });
    if (!post) errors(req.res, 'Post Not Found!!', 404);
    return post;
  },
  /**
   * add post
   * @param {object} parent - graphql parent object
   * @param {object} data - graphql input data
   * destructured { title, headerimage, excerpt, author, content }
   * @param {object} models - database model
   * @returns {object} user - The user object
   */
  async addPost(parent, {
    title,
    headerImage,
    excerpt,
    author,
    content
  }, { req, admin, models }) {
    if (!admin) errors(req.res, 'Not Authorized', 403);
    const slug = title.replace(/ /g, '-').toLowerCase();
    return models.Post.create({
      title,
      headerImage,
      excerpt,
      slug,
      author,
      content
    });
  },

  /**
   * delete post
   * @param {object} parent - graphql parent object
   * @param {object} data - graphql input data
   * destructured { email, password }
   * @param {object} models - database model
   * @returns {object} user - The user object
   */
  async deletePost(parent, { id }, { req, admin, models }) {
    if (!admin) errors(req.res, 'Not Authorized', 403);
    await models.Post.destroy({ where: { id } });
    return `post with id ${id} deleted successfully`;
  },

  /**
   * edit a  post
   * @param {object} parent - graphql parent object
   * @param {object} data - graphql input data
   * destructured { title, headerimage, excerpt, author, content }
   * @param {object} models - database model
   * @returns {object} user - The user object
   */
  async editPost(parent, {
    id,
    title,
    headerImage,
    excerpt,
    author,
    content
  }, { req, admin, models }) {
    if (!admin) errors(req.res, 'Not Authorized', 403);
    const slug = title.replace(/ /g, '-').toLowerCase();
    const updateData = {
      title,
      headerImage,
      excerpt,
      slug,
      author,
      content
    };
    const [rowaffected, [entity]] = await models.Post.update(
      updateData, { returning: true, where: { id } }
    );
    if (!rowaffected) errors(req.res, 'post to be edited not found', 404);
    return entity.dataValues;
  }
};

export default Newsletters;
