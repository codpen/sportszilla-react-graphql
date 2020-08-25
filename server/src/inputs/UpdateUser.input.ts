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

  @Field({ nullable: true })
  location?: string;

  @Field(() => [Number], { nullable: true })
  favSports: number[];

  // @Field(() => [Number], { nullable: true })
  // friends: number[];
}
