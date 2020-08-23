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

  @CreatedAt
  @Field(() => Date)
  creationDate: Date;

  @UpdatedAt
  @Field(() => Date)
  updatedOn: Date;

  @DeletedAt
  @Field(() => Date, { nullable: true })
  deletionDate: Date;

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
