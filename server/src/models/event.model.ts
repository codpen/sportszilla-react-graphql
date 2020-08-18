import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { ObjectType, Field } from 'type-graphql';
// import User from './user.model';

@Table
@ObjectType()
export default class Event extends Model<Event> {
  @Column
  @Field(() => String)
  sportEventName: string;

  @Column
  @Field(() => String)
  sportName: string;

  @Column
  @Field(() => String)
  time: string;

  @Column
  @Field(() => String)
  date: Date;

  @Column
  @Field(() => Boolean)
  indoor: boolean;

  @Column
  @Field(() => Number)
  availableSpots: number;

  // @Column
  // @Field({ nullable: true })
  // createdAt: string;

  // @Column
  // @Field({ nullable: true })
  // updatedAt: string;

  // @Column
  // @Field(() => User)
  // playersAssigned: User[];

  // @Column
  // @Field()
  // location: {
  //     lat: number,
  //     lng: number,
  //     address: string,
  //     venue: string,
  // };
}
