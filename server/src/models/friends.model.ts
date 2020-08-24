import {Model, Table, PrimaryKey, Column, ForeignKey} from 'sequelize-typescript';
import User from '../models/user.model'

@Table
export class UserFriends extends Model<UserFriends> {
  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  friendId: number;
}