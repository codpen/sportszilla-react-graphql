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

  @Field()
  location: string;

  @Field({ nullable: true })
  latitude: number;

  @Field({ nullable: true })
  longitude: number;

  @Field()
  accuracy: number;

  @Field(() => [Number], { nullable: true })
  favSports: number[];
}
