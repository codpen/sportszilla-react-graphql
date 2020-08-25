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
  HasOne,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from 'type-graphql';
import Sport from './sport.model';
import User from './user.model';
import Participants from './participants.model';

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
  @Field(() => Date)
  timeStart: Date;

  @Column
  @Field(() => Date)
  timeEnd: Date;

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

  @BelongsToMany(() => User, () => Participants)
  @Field(() => [User])
  participants: User[];
}
