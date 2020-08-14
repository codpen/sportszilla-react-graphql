import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import dotenv from 'dotenv';
import { BookResolver } from './resolvers/BookResolver';

dotenv.config();
const { PORT } = process.env;

async function startServer() {
  const schema = await buildSchema({
    resolvers: [BookResolver],
  });
  const server = new ApolloServer({ schema });
  server.listen(PORT)
    .then(() => console.info(`Server has started on port: ${PORT}!`));
}

startServer();
