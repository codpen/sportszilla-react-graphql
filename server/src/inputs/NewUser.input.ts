import { InputType, Field } from 'type-graphql';

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
}
/**
 * suggestions for the table-

 * @Field()
 * interests: sting,
 * @Field()
 * location {'not sure if a sttring or {lat: string/number
 *                                      lng: string/number}},
 */
