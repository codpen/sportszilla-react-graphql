import {
  Resolver, Query, Mutation, Arg,
} from 'type-graphql';
// import Sport from '../models/sport.model'
import User from '../models/user.model'

@Resolver()
export default class favSportResolver {
  @Query(() => User)
  async getOneUser(@Arg('ID') id: number) {
    try {
      return User.findOne({ where: { 'ID': id } });
    } catch (err) {
      console.error(err);
    }
  }
}