import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserType {
  @Field()
  id: number;

  @Field()
  role: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  lasttestdate: string;

  @Field({ nullable: true })
  score: number;

  @Field(() => [String], { nullable: true })
  questans: string[];

  static fromModel(model: User) {
    if (!model) {
      return null;
    }

    const user = new UserType();

    user.id = model.id;
    user.role = model.role;
    user.firstname = model.firstname;
    user.lastname = model.lastname;
    user.password = model.password;
    user.lasttestdate = model.lasttestdate;
    user.score = model.score;
    user.questans = model.questans;

    return user;
  }
}
