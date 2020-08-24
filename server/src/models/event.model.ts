import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from 'type-graphql';
import User from '../models/user.model'

@Table
@ObjectType()
export default class Event extends Model<Event> {
  @AutoIncrement
  @PrimaryKey
  @Column
  @Field(() => Int)
  readonly ID: number;

  @Unique(true)
  @Column
  @Field(() => String)
  eventName: string;

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
  @Field(() => String)
  location: string;

  @Column
  @Field(() => Boolean)
  indoor: boolean;

  @Column
  @Field(() => String)
  timeStart: string;

  @Column
  @Field(() => String)
  timeEnd: string;

  @Column
  @Field(() => Number)
  availableSpots: number;

  @CreatedAt
  @Field(() => Date)
  creationDate: Date;

  @UpdatedAt
  @Field(() => Date)
  updatedOn: Date;

  @DeletedAt
  @Field(() => Date, { nullable: true })
  deletionDate: Date;

  @Column
  @Field(() => String, { nullable: true })
  lat: string

  @Column
  @Field(() => String, { nullable: true })
  lng: string

  // @Column
  // @Field(() => [User])
  // registeredUsers: User[];

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
