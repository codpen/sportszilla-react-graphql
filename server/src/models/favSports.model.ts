/* eslint-disable */
import {
	Table,
	Column,
	HasMany,
	Model,
	ForeignKey
} from 'sequelize-typescript';

import { ObjectType, Field } from 'type-graphql';
import User from './user.model';
import Sport from './sport.model';

@Table
export default class FavSports extends Model<FavSports> {
	@ForeignKey(() => User)
	@Column
	userId: number;

	@ForeignKey(() => Sport)
	@Column
	sportId: number;
}

