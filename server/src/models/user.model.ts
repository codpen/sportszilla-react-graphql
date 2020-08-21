import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  DataType,
  BelongsToMany,
  HasOne,
  Unique
} from 'sequelize-typescript';
import { ObjectType, Field, Int, ID } from 'type-graphql';
import Sport from './sport.model';
import FavSports from './favSports.model'
import sportResolver from '../resolvers/sportResolver';
import { UniqueArgumentNamesRule, UniqueOperationTypesRule } from 'graphql';

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
  @Field(() => String)
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
  @Field(() => String)
  passW: string;

  @Column
  @Field(() => Date, { nullable: true })
  birthday: Date;

  @BelongsToMany(() => Sport, () => FavSports)
  @Field(() => [Sport], { nullable: true })
  favSports: Sport[];

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
  // @Field(() => )
  // favariteSports: Sport[];

  /** query da tabala de usuarios  */
  /**
  
   * create @Column @Field(() => [Sport])
   * favSports: Sportr []
   */

  /*
  @HasMany(() => Event)
  events: Event[];
  */

  /**
   * fixing eslint experimentaldecoreator:
   * In VSCode go to preferences -> settings,
   * you will see an option to enable/disable experimentalDecorators.
   * Check it and save the settings file. Done
   */
}
