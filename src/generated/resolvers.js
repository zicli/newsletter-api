import { GraphQLDate } from 'graphql-iso-date';
import {
  Authorizations,
  Newsletters,
  Subscribers
} from '../controllers';

const {
  currentUser,
  signup,
  login,
} = Authorizations;
const {
  getAllNewsletters,
  getOneNewsletter,
  addPost,
  deletePost,
  editPost,
} = Newsletters;

const {
  addSubscriber
} = Subscribers;

const resolvers = {

  Date: GraphQLDate,
  Query: {

    currentUser,
    getAllNewsletters,
    getOneNewsletter,
  },

  Mutation: {

    signup,
    login,
    addPost,
    deletePost,
    editPost,
    addSubscriber
  },
};

module.exports = resolvers;
