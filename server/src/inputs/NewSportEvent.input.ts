import { InputType, Field } from 'type-graphql';
// import User from '../models/user.model';

@InputType()
export default class NewSportEvent {
  @Field()
  eventName: string;

  @Field()
  timeStart: Date;

  @Field()
  timeEnd: Date;

  @Field()
  date: Date;

  @Field()
  indoor: boolean;

  @Field()
  availableSpots: number;

  @Field()
  location: string;

  @Field()
  minParticipants: number;

  @Field()
  maxParticipants: number;

  @Field()
  description: string;

  @Field()
  sportID: number;

  @Field()
  userID: number;

  @Field({ nullable: true })
  lat: string;

  @Field({ nullable: true })
  lng: string;

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
