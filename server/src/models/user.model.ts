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
  @Field(() => String) // set unique to true
  email: string;

  @Column
  @Field(() => String)
  password: string;

  @Column
  @Field(() => Date)
  birthday: Date;

  /**
 * suggestions for the table
 * @Field()
 * userName: string,
 * @Field()
 * interests: sting,
 * @Field()
 * location {'not sure if a sttring or {lat: string/number
 *                                      lng: string/number}},
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
