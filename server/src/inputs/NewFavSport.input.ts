import { InputType, Field } from 'type-graphql';
import User from '../models/user.model';
import Sport from '../models/sport.model';

@InputType()
export default class NewFavSport {
  @Field(() => User)
  userId: number;

  @Field(() => Sport)
  sportId: number;
}
