import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Snippet } from 'src/snippets/entities/snippet.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Project {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  period: string;

  @ManyToOne()
  owner: User;

  @OneToMany(() => Assignment, (a) => a.project)
  assignments = new Collection<Assignment>(this);

  @OneToMany(() => Snippet, (s) => s.project)
  snippets = new Collection<Snippet>(this);
}
