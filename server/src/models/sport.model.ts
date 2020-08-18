import {
    Table, column, Model, HasMany, Column,
} from 'sequelize-typescript'
import { ObjectType, Field, Id } from 'type-graphql'
import { User from }'./user.model'
import { FieldsOnCorrectTypeRule } from 'graphql'

@Table
@ObjectType()
export default class Sport extends Model<Sport>{
@Column
@Field(() => String)
sportName: string;

@Column
@Field(() => [User])
playersAssigned: User[];

@Column
@Field(() => String)
fieldType: String;

@Column
@Field(() => Boolean)
indoor: Boolean;

@Column
@Field(() => Number)
minPlayersToPracticeSport: Number;


}
