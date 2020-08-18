/* eslint-disable */
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import NewUser from '../inputs/NewUser.input';
import UpdateUser from '../inputs/UpdateUser.input';

@Resolver()
export default class UserResolver {
  @Query(() => User)
  async getOneUser(@Arg('ID') id: number) {
    try {
      return User.findOne({ where: { ID: id } });
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => User)
  async newUser(@Arg('userData') userData: NewUser) {
    try {
      const { passW } = userData;
      const pswdHash = await bcrypt.hash(passW, 10);
      userData.passW = pswdHash;
      return User.create(userData);
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => User)
  async updateUser(@Arg('ID') id: number, @Arg('userData') userData: UpdateUser) {
    try {
      const user = await User.findOne({ where: { ID: id } });
      if (!user) throw new Error('User not found!');
      if (userData.passW) {
        const { passW } = userData;
        const pswdHash = await bcrypt.hash(passW, 10);
        userData.passW = pswdHash;
      }
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
}
