import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Script {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  assignment: Assignment;

  @Property()
  file!: string;

  @ManyToOne()
  assignee: User;
}
