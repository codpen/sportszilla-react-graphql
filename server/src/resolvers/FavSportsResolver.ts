import { Resolver, Query, Mutation, Arg } from 'type-graphql';
// import Sport from '../models/sport.model'
import User from '../models/user.model';
import FavSports from '../models/favSports.model';
import Sport from '../models/sport.model';

@Resolver()
export default class favSportResolver {
  @Query(() => User)
  async getAllUser(@Arg('ID') id: number): Promise<User[]>{
    try {
      const result = await User.findAll({ where: { ID: id } });
      return result
    } catch (err) {
      console.error(err);
    }
  }
  @Query(() => Sport)
  async getAllSports(@Arg('ID') id: number): Promise<Sport[]>{
    try {
      const result = await Sport.findAll({ where: { ID: id } });
      return result
    } catch (err) {
      console.error(err);
    }
  }

  // @Mutation(() => FavSports)
  // async newFavSport()
}
