import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  types,
} from '@mikro-orm/core';
import { Grading } from 'src/gradings/entities/grading.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Script } from 'src/scripts/entities/script.entity';
import { Snippet } from 'src/snippets/entities/snippet.entity';

@Entity()
export class Assignment {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  project!: Project;

  @Property()
  name!: string;

  @Property({ type: types.text })
  description: string;

  @OneToMany(() => Script, (s) => s.assignment, { cascade: [Cascade.ALL] })
  scripts = new Collection<Script>(this);

  @OneToMany(() => Grading, (g) => g.assignment)
  gradings = new Collection<Grading>(this);

  @OneToMany(() => Snippet, (s) => s.assignment)
  snippets = new Collection<Snippet>(this);
}
