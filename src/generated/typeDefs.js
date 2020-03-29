import { gql } from 'apollo-server-express';

const typeDefs = gql`

  type Admin {
    id: Int!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
  }

  type Query {
    currentUser: Admin!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!, firstName: String!, lastName: String!, adminKey: String!): Admin!
  }
`;

module.exports = typeDefs;
