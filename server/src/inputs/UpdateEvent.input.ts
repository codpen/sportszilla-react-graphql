import { InputType, Field } from 'type-graphql';

@InputType()
export default class UpdateEvent {
  @Field({ nullable: true })
  eventName?: string;

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

  @Field({ nullable: true })
  timeStart?: string;

  @Field({ nullable: true })
  timeEnd?: string;

  @Field(() => [Number], { nullable: true })
  participants: number[]
}
