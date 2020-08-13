import { IResolvers } from "graphql-tools";

const resolvers: IResolvers = {
  Query: {
    helloWorld: () => "Hello world from Apollo Server",
  },
};

export default resolvers;
