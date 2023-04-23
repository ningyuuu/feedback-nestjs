import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Project } from 'src/projects/entities/project.entity';
import { Script } from 'src/scripts/entities/script.entity';

@Entity()
@Unique({ properties: ['name', 'project'] })
export class Student {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  project!: Project;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @OneToMany({ entity: () => Script, mappedBy: 'student', cascade: [Cascade.ALL] })
  scripts = new Collection<Script>(this);
}
