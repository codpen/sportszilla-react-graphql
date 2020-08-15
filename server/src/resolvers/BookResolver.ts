import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import * as bcrypt from 'bcryptjs'
import { User } from '../models/user.model'
@Resolver()
export default class RegisterResolver{
  @Query(() => String)
  async hello(){
    return 'hello there';
  }
  @Mutation(() => String)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string;
  ){
    const hashedPassword = bcrypt.hash(password, 12);
    
    const user = User.create({
      firstName,
      lastName,
      email,
      password,
    })
  }
}
