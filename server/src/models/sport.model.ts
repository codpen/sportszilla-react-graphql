import {
  Table,
  Column,
  Model,
  HasMany,
  AutoIncrement,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
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

  @Column
  @Field(() => String)
  sportName: string;

  // @HasOne(() => User, 'userName')
  // // @BelongsToMany(() => User, () => FavSports)
  // @Field(() => User, { nullable: true })
  // favedBy: User[];

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
