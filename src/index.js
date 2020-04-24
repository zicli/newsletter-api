/* eslint-disable prefer-destructuring */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './generated';
import models from './models';
import { Toolbox } from './utils';


// apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let token;
    if (req.headers.cookie) token = req.headers.cookie.split('=')[1];
    if (req.headers.authorization) token = req.headers.authorization.split(' ')[1];
    const admin = Toolbox.jwtCheck(token);
    return { req, admin, models };
  }
});

// server
const app = express();
server.applyMiddleware({ app });

// sync and authenticate all db models
// models.sequelize.authenticate();
// models.sequelize.sync();

// eslint-disable-next-line no-console
app.listen(3000, () => console.log(`listening on port http://localhost:3000${server.graphqlPath} 🚀 `));

export default app;
