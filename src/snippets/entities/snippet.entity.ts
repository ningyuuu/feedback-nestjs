import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Project } from 'src/projects/entities/project.entity';

@Entity()
export class Snippet {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  project: Project;

  @ManyToOne({ nullable: true, entity: () => Assignment })
  assignment?: Assignment;

  @Property()
  text: string;
}
