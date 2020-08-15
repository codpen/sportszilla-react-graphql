import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import User from '../models/user.model';
import UserDataInput from '../inputs/userData.input';

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
  async newUser(@Arg('userData') userData: UserDataInput) {
    try {
      console.log(userData);
      const user = await User.create(userData);
      return user;
    } catch (err) {
      console.error(err);
    }

  }
}

/*
@Resolver()
export default class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'hello there';
  }

  @Mutation(() => String)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise <User> {
    const hashedPassword = bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    })

    return user;
  }
}
*/
