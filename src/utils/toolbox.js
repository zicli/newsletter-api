import jwt from 'jsonwebtoken';
import env from '../config/env';

const Toolbox = {
  /**
   * error response
   * @param {Response} res - Response object.
   * @param {string} message - error message
   * @param {number} code - error code
   * @returns {object} - returns an error object
   */
  errors(res, message, code = 500) {
    res.status(code);
    throw new Error(message);
  },
  /**
   * jwt check
   * @param {string} token - user token
   * @returns {object} - returns object of user token values
   */
  jwtCheck(token) {
    try {
      if (token) return jwt.verify(token, env.SECRET);
      return null;
    } catch (error) {
      return null;
    }
  }

};

export default Toolbox;
