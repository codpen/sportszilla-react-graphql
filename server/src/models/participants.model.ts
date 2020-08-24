/* eslint-disable */
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';

import User from './user.model';
import Event from './event.model';

@Table
export default class Participants2 extends Model<Participants2> {
  @ForeignKey(() => User)
  @Column
  userID: number;

  @ForeignKey(() => Event)
  @Column
  sportID: number;
}
