import { InputType, Field } from 'type-graphql';

@InputType()
export default class UpdateUser {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  passW?: string;

  @Field({ nullable: true })
  birthday?: Date;
}
