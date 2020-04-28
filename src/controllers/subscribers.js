
import { Toolbox } from '../utils';

const { errors } = Toolbox;

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
    const subscriber = await models.Subscriber.findOne({ where: { email } });
    if (subscriber) return errors(req.res, 'Email already exist!', 400);
    return models.Subscriber.create({
      email
    });
  }
};

export default Subscribers;
