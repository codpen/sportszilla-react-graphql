/* eslint-disable */
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import NewUser from '../inputs/NewUser.input';
import UpdateUser from '../inputs/UpdateUser.input';

@Resolver()
export default class UserResolver {
  @Query(() => User)
  async getOneUser(@Arg('id') id: number) {
    try {
      return User.findOne({ where: { 'id': id } })
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => User)
  async newUser(@Arg('userData') userData: NewUser) {
    try {
      const { password } = userData;
      const pswdHash = await bcrypt.hash(password, 10);
      userData.password = pswdHash;
      return User.create(userData);
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => User)
  async updateUser(@Arg('id') id: number, @Arg('userData') userData: UpdateUser) {
    try {
      const user = await User.findOne({ where: { 'id': id } });
      if (!user) throw new Error('User not found!');
      if (userData.password) {
        const { password } = userData;
        const pswdHash = await bcrypt.hash(password, 10);
        userData.password = pswdHash;
      }
      return user.update(userData);
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number) {
    try {
      const user = await User.findOne({ where: { 'id': id } });
      if (!user) throw new Error('User not found!');
      await user.destroy();
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
