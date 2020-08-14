import { Resolver, Query } from 'type-graphql';

@Resolver()
export class BookResolver {
  @Query(() => String)
  hello() {
    return 'world';
  }
}
