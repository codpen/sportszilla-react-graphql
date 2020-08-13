import 'graphql-import-node';
import * as typeDefs from './schema/schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers/resolvers';
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
