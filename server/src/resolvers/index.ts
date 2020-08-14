import { IResolvers } from 'graphql-tools';

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];
let idCount = links.length;
const resolvers: IResolvers = {
  Query: {
    helloWorld: () => 'Hello world from Apollo Server',
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

export default resolvers;
