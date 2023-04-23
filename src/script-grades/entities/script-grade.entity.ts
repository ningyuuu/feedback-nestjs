import { Cascade, Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Grading } from 'src/gradings/entities/grading.entity';
import { Script } from 'src/scripts/entities/script.entity';

@Entity()
@Unique({ properties: ['script', 'grading'] })
export class ScriptGrade {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Script, cascade: [Cascade.ALL] })
  script: Script;

  @ManyToOne()
  grading: Grading;

  @Property()
  grade: number;

  @Property({ nullable: true })
  comments?: string;
}
