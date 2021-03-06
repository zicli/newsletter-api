
import { Toolbox, Mailer } from '../utils';

const { errors } = Toolbox;
const { sendNewSubscriberMessage } = Mailer;

const Subscribers = {

  /**
   * add subcribers
   * @param {object} parent - graphql parent object
   * @param {object} data - graphql input data
   * destructured { email }
   * @param {object} models - database model
   * @returns {object} user - The subscriber object
   */
  async addSubscriber(parent, {
    email
  }, { req, models }) {
    if (!email) return errors(req.res, 'Please Type in an Email', 400);
    const subscriber = await models.Subscriber.findOne({ where: { email } });
    if (subscriber) return errors(req.res, 'You\'ve Subscribed Already', 400);
    const newSubcriber = await models.Subscriber.create({
      email
    });
    const emailSent = await sendNewSubscriberMessage(email);
    if (emailSent) return newSubcriber;
  },

  /**
   * remove subcribers
   * @param {object} parent - graphql parent object
   * @param {object} data - graphql input data
   * destructured { email }
   * @param {object} models - database model
   * @returns {object} user - The subscriber object
   */
  async removeSubscriber(parent, { email }, { req, models }) {
    if (!email) return errors(req.res, 'Please Type in an Email', 400);
    const subscriber = await models.Subscriber.findOne({ where: { email } });
    if (!subscriber) return errors(req.res, 'This Email Does Not Exist', 400);
    await models.Subscriber.destroy({ where: { email } });
    return `Subscriber with email ${email} deleted successfully`;
  }
};

export default Subscribers;
