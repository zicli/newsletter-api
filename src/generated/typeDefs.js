import { gql } from 'apollo-server-express';

const typeDefs = gql`
scalar Date

  type Admin {
    id: Int!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    token: String!
  }

  type Query {
    currentUser: Admin!,
    getAllNewsletter: [Post]
    getOneNewsletter(id: Int!): Post!
  }

  type Post {
    id: Int!
    title: String!
    headerImage: String!
    excerpt: String!
    slug: String!
    author: String!
    content: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!, firstName: String!, lastName: String!, adminKey: String!): Admin!
    login(email: String!, password: String): Admin!
    addPost(title: String!, headerImage: String!, excerpt: String!, author: String!, content: String!): Post!
    editPost(id: Int!, title: String, headerImage: String, excerpt: String, author: String, content: String): Post!
    deletePost(id: Int!): String!
  }
`;

module.exports = typeDefs;
