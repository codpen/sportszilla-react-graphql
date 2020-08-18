import { InputType, Field } from 'type-graphql';

@InputType()
export default class UpdateEvent {
  @Field({ nullable: true })
  sportEventName?: string;

  @Field({ nullable: true })
  sportName?: string;

  @Field({ nullable: true })
  time?: string;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  indoor?: Date;

  @Field({ nullable: true })
  availableSpots?: number;
}
