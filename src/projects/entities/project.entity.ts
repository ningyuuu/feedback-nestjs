import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Project {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  period: string;

  @Property()
  owner: User;
}
