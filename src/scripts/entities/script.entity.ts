import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Student } from 'src/students/entities/student.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Script {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  assignment: Assignment;

  @ManyToOne()
  student: Student;

  @Property()
  file!: string;

  @ManyToOne({ nullable: true, entity: () => User })
  assignee?: User;
}
