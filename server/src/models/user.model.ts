import {
  Table, Column, Model, HasMany,
} from 'sequelize-typescript';
import { ObjectType, Field, ID } from 'type-graphql';

@Table
@ObjectType()
export default class User extends Model<User> {
  @Field(() => String)
  @Column
  firstName: string;

  @Field(() => String)
  @Column
  lastName: string;

  @Field(() => Date)
  @Column
  birthday: Date;

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
