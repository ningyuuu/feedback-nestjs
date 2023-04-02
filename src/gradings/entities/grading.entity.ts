import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Entity()
export class Grading {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  assignment: Assignment;

  @Property()
  name!: string;

  @Property()
  marks!: number;
}
