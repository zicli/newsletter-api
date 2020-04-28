
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import { Toolbox, Mailer } from '../utils';

const { ADMIN_KEY, SECRET, CLIENT_URL } = env;
const { errors } = Toolbox;
const { sendNewsletterEmail } = Mailer;

const Newsletters = {

  /**
   * query all post in the database
   * @param {object} parent - graphql parent object
   * @param {object} args - graphql input data
   * @param {object} models - database model
   * @returns {array} post - The post array
   */
  async getAllNewsletters(parent, args, { models }) { return models.Post.findAll(); },

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
    const post = await models.Post.create({
      title,
      headerImage,
      excerpt,
      slug,
      author,
      content
    });

    const subscriber = await models.Subscriber.findAll({});
    const emails = subscriber.map((item) => item.email);
    const newsletterLink = `${CLIENT_URL}`;
    const email = await sendNewsletterEmail(emails, newsletterLink);
    if (email) return post;
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
