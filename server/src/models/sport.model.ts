import {
  Unique,
  Table,
  Column,
  Model,
  HasMany,
  AutoIncrement,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from 'type-graphql';
import FavSports from './favSports.model';
import User from './user.model';
import { type } from 'os';

@Table
@ObjectType()
export default class Sport extends Model<Sport> {
  @AutoIncrement
  @PrimaryKey
  @Column
  @Field(() => Int)
  readonly ID: number;

  @Unique(true)
  @Column
  @Field(() => String)
  sportName: string;

  @BelongsToMany(() => User, () => FavSports)
  @Field(() => [User], { nullable: true })
  favedBy: User[];

  @Column
  @Field(() => Boolean)
  indoor: Boolean;

  @Column
  @Field(() => String)
  fieldType: string;

  @Column
  @Field(() => Number)
  minPlayersToPracticeSport: number;

  @Column
  @Field(() => String)
  equipamentNeeded: string

  @CreatedAt
  @Field(() => Date)
  creationDate: Date;

  @UpdatedAt
  @Field(() => Date)
  updatedOn: Date;
}
