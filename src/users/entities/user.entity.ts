import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { UsersRepository } from './users.repository';

@Entity({ repository: () => UsersRepository })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  login!: string;

  @Property()
  password!: string;

  @Property({ default: '' })
  name!: string;

  @Property({ default: false })
  admin!: boolean;
}
