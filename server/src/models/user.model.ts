import {
  Table, Column, Model, HasMany,
} from 'sequelize-typescript';
import { ObjectType, Field, ID } from 'type-graphql';

@Table
@ObjectType()
export default class User extends Model<User> {
  @Column
  @Field(() => String)
  firstName: string;

  @Column
  @Field(() => String)
  lastName: string;

  @Column
  @Field(() => Date)
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
