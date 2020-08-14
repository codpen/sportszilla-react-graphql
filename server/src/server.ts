import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { BookResolver } from './resolvers/BookResolver';

async function main() {
  const schema = await buildSchema({
    resolvers: [BookResolver], // add this
  });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.info('Server has started!');
}

main();
