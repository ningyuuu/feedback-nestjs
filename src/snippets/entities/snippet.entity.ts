import { Entity, ManyToOne, PrimaryKey, Property, types } from '@mikro-orm/core';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Snippet {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ nullable: true, entity: () => Project })
  project?: Project;

  @ManyToOne({ nullable: true, entity: () => Assignment })
  assignment?: Assignment;

  @Property({ type: types.text })
  text: string;

  @ManyToOne({ nullable: true, entity: () => User })
  user?: User;
}
