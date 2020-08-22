import { InputType, Field } from 'type-graphql';
import { FilterRootFields } from 'graphql-tools';

@InputType()
export default class UpdateEvent {
  @Field({ nullable: true })
  sportEventName?: string;

  @Field({ nullable: true })
  sportName?: string;

  @Field({ nullable: true })
  time?: string;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  indoor?: boolean;

  @Field({ nullable: true })
  availableSpots?: number;

  @Field({ nullable: true })
  location?: string;
}
