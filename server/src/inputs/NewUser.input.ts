import { InputType, Field } from 'type-graphql';

@InputType()
export default class NewUser {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  birthday: Date;
}
/**
 * suggestions for the table-
 * @Field
 * userName: string,
 * @Field
 * interests: sting,
 * @Field
 * age: number,
 * @Field
 * location {'not sure if a sttring or {lat: string/number
 *                                      lng: string/number}},
 * 
 */