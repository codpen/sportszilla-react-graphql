/* eslint-disable */
import { Resolver, Query, Mutation, Arg, ObjectType, Field, FieldResolver, Root } from 'type-graphql';
import User from '../models/user.model';
import NewUser from '../inputs/NewUser.input';
import UpdateUser from '../inputs/UpdateUser.input';
import Sport from '../models/sport.model';
import FavSports from '../models/favSports.model';
import FavSportResolver from './FavSportsResolver';

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    try {
      return User.findAll({ order: [['ID', 'ASC']], include: [Sport] });
    } catch (err) {
      console.error(err);
    }
  }

  @Query(() => User)
  async getOneUser(@Arg('email') email: string, @Arg('passW') passW: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('User not found!');
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => User)
  async updateUser(@Arg('ID') id: number, @Arg('userData') userData: UpdateUser) {
    try {
      const user = await User.findOne({ where: { ID: id } });
      if (!user) throw new Error('User not found!');
      // await user.$set('favSports', userData.favSports);
      return user.update(userData);
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => User)
  async deleteUser(@Arg('ID') id: number) {
    try {
      const user = await User.findOne({ where: { ID: id } });
      if (!user) throw new Error('User not found!');
      return user.destroy();
    } catch (err) {
      console.error(err);
    }
  }

  @FieldResolver()
  async favSports(@Root() user: User) {
    console.log(user);
    return user.favSports || user.$get('favSports');
  }

}
