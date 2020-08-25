/* eslint-disable */
import { Resolver, Query, Arg } from 'type-graphql';
import User from '../models/user.model';
import Sport from '../models/sport.model';

@Resolver()
export default class favSportResolver {
  @Query(() => User)
  async getAllUsers(@Arg('ID') id: number): Promise<User[]> {
    try {
      const result = await User.findAll({ where: { ID: id }, include: [Sport] });
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  @Query(() => Sport)
  async getAllSports(@Arg('ID') id: number): Promise<Sport[]> {
    try {
      const result = await Sport.findAll({ where: { ID: id }, include: [User] });
      return result;
    } catch (err) {
      console.error(err);
    }
  }
}
