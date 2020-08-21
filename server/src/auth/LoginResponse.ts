import { ObjectType, Field } from 'type-graphql';
import User from '../models/user.model';

@ObjectType()
export default class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  user: User
}
