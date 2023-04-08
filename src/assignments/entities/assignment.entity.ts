import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Grading } from 'src/gradings/entities/grading.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Script } from 'src/scripts/entities/script.entity';

@Entity()
export class Assignment {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  project!: Project;

  @Property()
  name!: string;

  @Property()
  description: string;

  @OneToMany(() => Script, (s) => s.assignment)
  scripts = new Collection<Script>(this);

  @OneToMany(() => Grading, (g) => g.assignment)
  gradings = new Collection<Grading>(this);
}
