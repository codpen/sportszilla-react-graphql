import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  Unique,
  DataType,
} from 'sequelize-typescript';
import { ObjectType, Field, Int, Float } from 'type-graphql';
import Sport from './sport.model';
import Event from './event.model';
import FavSports from './favSports.model';
import Participants from './participants.model';

@Table
@ObjectType()
export default class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column
  @Field(() => Int)
  readonly ID: number;

  @Column
  @Field(() => String)
  firstName: string;

  @Column
  @Field(() => String, { nullable: true })
  lastName: string;

  @Unique(true)
  @Column
  @Field(() => String, { nullable: true })
  userName: string;

  @Unique(true)
  @Column
  @Field(() => String)
  email: string;

  @Column
  @Field(() => String, { nullable: true })
  passW: string;

  @Column
  @Field(() => Boolean, { nullable: true })
  fbUser: boolean;

  @Column
  @Field(() => Date, { nullable: true })
  birthday: Date;

  @Column
  @Field(() => String, { nullable: true })
  location: string;

  @Column(DataType.FLOAT)
  @Field(() => Float, { nullable: true })
  latitude: number;

  @Column(DataType.FLOAT)
  @Field(() => Float, { nullable: true })
  longitude: number;

  @Column(DataType.FLOAT)
  @Field(() => Float, { nullable: true })
  accuracy: number;

  @CreatedAt
  @Field(() => Date)
  creationDate: Date;

  @UpdatedAt
  @Field(() => Date)
  updatedOn: Date;

  @DeletedAt
  @Field(() => Date, { nullable: true })
  deletionDate: Date;

  @BelongsToMany(() => Sport, () => FavSports)
  @Field(() => [Sport], { nullable: true })
  favSports: Sport[];

  @BelongsToMany(() => Event, () => Participants)
  @Field(() => [Event], { nullable: true })
  participates: Event[];

  /*
  @BelongsToMany(() => User, () => UserFriends, 'userId', 'friendId')
  @Field(() => [User], { nullable: true })
  friends: User[];
  */
}
