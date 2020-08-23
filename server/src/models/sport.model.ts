import {
  Unique,
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from 'type-graphql';
import FavSports from './favSports.model';
import User from './user.model';

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
  fieldType: String;

  @Column
  @Field(() => Number)
  minPlayersToPracticeSport: Number;

  @CreatedAt
  @Field(() => Date)
  creationDate: Date;

  @UpdatedAt
  @Field(() => Date)
  updatedOn: Date;
}
