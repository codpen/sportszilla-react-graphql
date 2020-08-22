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

  @Field(() => [Number], { nullable: true })
  favSports: number[];

  @Field()
  location: string;
}
