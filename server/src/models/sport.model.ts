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

  // @Column
  // @Field(() => [User])
  // favoriteByUsers: User[];
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
