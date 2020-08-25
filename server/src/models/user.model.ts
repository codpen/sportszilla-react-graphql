import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  Unique,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from 'type-graphql';
import Sport from './sport.model';
import Event from './event.model';
import FavSports from './favSports.model';
import Participants from './participants.model';

@Table
@ObjectType()
export default class User2 extends Model<User2> {
  @AutoIncrement
  @PrimaryKey
  @Column
  @Field(() => Int)
  readonly ID: number;

  @Column
  @Field(() => String)
  firstName: string;

  @Column
  @Field(() => String)
  lastName: string;

  @Unique(true)
  @Column
  @Field(() => String, { nullable: true })
  userName: string;

  @Unique(true)
  @Column
  @Field(() => String)
  email: string;

  @Column
  @Field(() => String)
  passW: string;

  @Column
  @Field(() => Date, { nullable: true })
  birthday: Date;

  @Column
  @Field(() => String)
  location: string;

  @CreatedAt
  @Field(() => Date)
  creationDate: Date;

  @UpdatedAt
  @Field(() => Date)
  updatedOn: Date;

  @DeletedAt
  @Field(() => Date, { nullable: true })
  deletionDate: Date;

  @BelongsToMany(() => Sport, () => FavSports)
  @Field(() => [Sport], { nullable: true })
  favSports: Sport[];

  /*
  @BelongsToMany(() => User, () => UserFriends, 'userId', 'friendId')
  @Field(() => [User], { nullable: true })
  friends: User[];
  */

  /**
   * create @Column @Field(() => [Sport])
   * favSports: Sportr []
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
