import { InputType, Field } from 'type-graphql';

@InputType()
export default class NewSport {
  @Field()
  sportName: String;

  @Field()
  indoor: Boolean;

  @Field()
  fieldType: String;

  @Field()
  minPlayersToPracticeSport: Number;
}
