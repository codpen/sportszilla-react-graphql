import { InputType, Field } from 'type-graphql';
// import User from '../models/user.model';

@InputType()
export default class NewSportEvent {
  @Field()
  eventName: string;

  @Field()
  sportName: string;

  @Field()
  time: string;

  @Field()
  date: Date;

  @Field()
  indoor: boolean;

  @Field()
  availableSpots: number;

  @Field(() => String)
  timeStart: string;

  @Field(() => String)
  timeEnd: string;

  @Field({ nullable: true })
  lat: string;

  @Field({ nullable: true })
  lng: string;

  @Field({ nullable: true })
  description: string;

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
