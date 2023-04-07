import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Assignment } from 'src/assignments/entities/assignment.entity';
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

  @OneToMany(() => Assignment, (a) => a.project)
  assignments = new Collection<Assignment>(this);
}
