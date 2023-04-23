import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { ScriptGrade } from 'src/script-grades/entities/script-grade.entity';
import { Student } from 'src/students/entities/student.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Script {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Assignment, cascade: [Cascade.ALL] })
  assignment: Assignment;

  @ManyToOne({ entity: () => Student, cascade: [Cascade.ALL] })
  student: Student;

  @Property()
  file!: string;

  @ManyToOne({ nullable: true, entity: () => User })
  assignee?: User;

  @OneToMany({ entity: () => ScriptGrade, mappedBy: 'script', cascade: [Cascade.ALL] })
  scriptGrades = new Collection<ScriptGrade>(this);
}
