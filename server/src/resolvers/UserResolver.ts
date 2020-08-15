import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import * as bcrypt from 'bcryptjs'
import User from '../models/user.model'

@Resolver()
export default class UserResolver {
  @Query(() => User)
  getOneUser(@Arg('id') id: string) {
    return User.findOne({ where: { id } })
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
