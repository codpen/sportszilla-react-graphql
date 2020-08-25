import { InputType, Field } from 'type-graphql';

@InputType()
export default class NewSportEvent {
  @Field()
  eventName: string;

  @Field()
  timeStart: Date;

  @Field()
  timeEnd: Date;

  @Field()
  indoor: boolean;

  @Field()
  availableSpots: number;

  @Field()
  location: string;

  @Field({ nullable: true })
  latitude: number;

  @Field({ nullable: true })
  longitude: number;

  @Field({ nullable: true })
  accuracy: number;

  @Field()
  minParticipants: number;

  @Field()
  maxParticipants: number;

  @Field()
  description: string;

  @Field()
  sportID: number;

  @Field()
  sport: number;

  @Field(() => [Number], { nullable: true })
  participants: number[];

  //   @Field({ nullable: true })
  //   createdAt: string;

  //   @Field({ nullable: true })
  //   updatedAt: string;

  //   @Field()
  //   playersAssigned: [User];

  //   @Field()
  //   location: {
  //       lat: number,
  //       lng: number,
  //       address: string,
  //       venue: string,
  //   };
}
