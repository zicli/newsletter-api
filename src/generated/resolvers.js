import { GraphQLDate } from 'graphql-iso-date';
import {
  Authorizations,
  Newsletters,
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
  },
};

module.exports = resolvers;
