/* eslint-disable */
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';

import User from './user.model';
import Event from './event.model';

@Table
export default class Participants extends Model<Participants> {
  @ForeignKey(() => User)
  @Column
  userID: number;

  @ForeignKey(() => Event)
  @Column
  sportID: number;
}
