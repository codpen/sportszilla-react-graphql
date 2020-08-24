import {
  Table,
  Column,
  Model,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  AutoIncrement,
  Unique,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from 'type-graphql';
import Sport from './sport.model';
import User from './user.model';
import Participants from './participants.model';

@Table
@ObjectType()
export default class Event2 extends Model<Event2> {
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
  @Field(() => Date)
  timeStart: Date;

  @Column
  @Field(() => Date)
  timeEnd: Date;

  @Column
  @Field(() => Date)
  date: Date;

  @Column
  @Field(() => String)
  location: string;

  @Field(() => Int)
  @Column
  minParticipants: number;

  @Field(() => Int)
  @Column
  maxParticipants: number;

  @Column
  @Field(() => Boolean)
  indoor: boolean;

  @Column
  @Field(() => Int)
  availableSpots: number;

  @Column
  @Field(() => String)
  description: string;

  @CreatedAt
  @Field(() => Date)
  creationDate: Date;

  @UpdatedAt
  @Field(() => Date)
  updatedOn: Date;

  @DeletedAt
  @Field(() => Date, { nullable: true })
  deletionDate: Date;

  @ForeignKey(() => Sport)
  @Column
  @Field(() => Int)
  sportID: number;

  @BelongsTo(() => Sport)
  @Field(() => Sport)
  sport: Sport;

  @ForeignKey(() => User)
  @Column
  @Field(() => Int)
  userID: number;

  @BelongsTo(() => User)
  @Field(() => User)
  eventCreator: User;

  @BelongsToMany(() => User, () => Participants)
  @Field(() => [User], { nullable: true })
  participants: User[];

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
