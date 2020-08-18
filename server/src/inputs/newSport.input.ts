import { InputType, Field } from "type-graphql";

@InputType()
export default class newSport {
  @Field()
  sportEventName: String;

  @Field()
  indoor: Boolean;

  @Field()
  fieldType: String;

  @Field()
  minPlayersToPracticeSport: Number;
}
