import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Project } from 'src/projects/entities/project.entity';

@Entity()
export class Student {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  project!: Project;

  @Property()
  name!: string;

  @Property()
  email!: string;
}
