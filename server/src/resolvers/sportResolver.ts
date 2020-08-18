import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import Sport from '../models/sport.model';
import NewSport from '../inputs/newSport.input';
@Resolver()
export default class sportResolver {
  @Query(() => Sport)
  async getOneSport(@Arg('sportName') sportName: string) {
    try {
      return await Sport.findOne({ where: { sportName: sportName } });
    } catch (error) {
      console.error(error);
    }
  }

  @Mutation(() => Sport)
  async newSport(@Arg('sportData') sportData: NewSport) {
    try {
      const result = await Sport.create(sportData);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
