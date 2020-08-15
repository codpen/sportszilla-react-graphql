import { InputType, Field } from 'type-graphql';

@InputType()
export default class UserDataInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  birthday: Date;
}
