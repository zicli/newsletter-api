
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
  }

};

export default Toolbox;
