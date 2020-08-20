import { InputType, Field } from 'type-graphql';
import Sport from '../models/sport.model';
import NewFavSport from './NewFavSport.input';

@InputType()
export default class NewUser {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  userName: string;

  @Field()
  email: string;

  @Field()
  passW: string;

  @Field()
  birthday: Date;

  @Field(() => [Number], { nullable: true })
  favSports: number[];
}
/**
 * suggestions for the table-

 * @Field()
 * interests: sting,
 * @Field()
 * location {'not sure if a sttring or {lat: string/number
 *                                      lng: string/number}},
 */
