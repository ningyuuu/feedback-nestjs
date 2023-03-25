import { EntityRepository } from '@mikro-orm/core';
import { User } from './user.entity';

export class UsersRepository extends EntityRepository<User> {}
