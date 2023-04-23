import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { UsersRepository } from './users.repository';
import { Project } from 'src/projects/entities/project.entity';

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

  @ManyToMany({ mappedBy: 'instructors' })
  projects = new Collection<Project>(this);
}
