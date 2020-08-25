import { Model, Table, Column, ForeignKey } from 'sequelize-typescript';
import User from './user.model';

@Table
export default class UserFriends extends Model<UserFriends> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => User)
  @Column
  friendId: number;
}
