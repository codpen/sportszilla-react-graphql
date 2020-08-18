import {
  Table, Column, Model, HasMany,
} from 'sequelize-typescript';
import { ObjectType, Field } from 'type-graphql';

@Table
@ObjectType()
export default class Sport extends Model<Sport> {
@Column
@Field(() => String)
sportName: string;

// @Column
// @Field(() => [User])
// favoriteByUsers: User[];
@Column
@Field(() => Boolean)
indoor: Boolean;

@Column
@Field(() => String)
fieldType: String;

@Column
@Field(() => Number)
minPlayersToPracticeSport: Number;
}
