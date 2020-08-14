import {
  Table, Column, Model, HasMany,
} from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  birthday: Date;

  /*
  @HasMany(() => Event)
  events: Event[];
  */
}
