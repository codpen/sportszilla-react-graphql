/* eslint-disable */
import { Table, Column, HasMany, Model, ForeignKey } from 'sequelize-typescript';

import { ObjectType, Field } from 'type-graphql';
import User from './user.model';
import Sport from './sport.model';

@Table
export default class FavSports2 extends Model<FavSports2> {
  @ForeignKey(() => User)
  @Column
  userID: number;

  @ForeignKey(() => Sport)
  @Column
  sportID: number;
}
