import { Seeder } from '@mikro-orm/seeder';
import { EntityData, EntityManager } from '@mikro-orm/core';
import { User } from 'src/users/entities/user.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Grading } from 'src/gradings/entities/grading.entity';
import { Script } from 'src/scripts/entities/script.entity';
import { Student } from 'src/students/entities/student.entity';
import { ScriptGrade } from 'src/script-grades/entities/script-grade.entity';
import { Snippet } from 'src/snippets/entities/snippet.entity';

const userData: EntityData<User>[] = [
  { login: 'anntay@gmail.com', name: 'Ann Tay', password: '123' },
  { login: 'johnlim@gmail.com', name: 'John Lim', password: '123' },
  { login: 'harryteo@gmail.com', name: 'Harry Teo', password: '123' },
  { login: 'richardlee@gmail.com', name: 'Richard Lee', password: '123' },
  { login: 'charlotteau@gmail.com', name: 'Nur Halizah', password: '123' },
  { login: 'rebeccaloh@gmail.com', name: 'Kavitha Raju', password: '123' },
  { login: 'martintay@gmail.com', name: 'Martin Tay', password: '123' },
  { login: 'sarahpeh@gmail.com', name: 'Sarah Peh', password: '123' },
  { login: 'joeylee@gmail.com', name: 'Joey Lee', password: '789' },
];

const projectData: EntityData<Project>[] = [
  { name: 'CS6460 Education Technology', period: 'Fall 2023', owner: userData[0] },
];

const studentData: EntityData<Student>[] = [
  { project: projectData[0], name: 'Student 1', email: 'student1@mail.com' },
  { project: projectData[0], name: 'Student 2', email: 'student2@mail.com' },
  { project: projectData[0], name: 'Student 3', email: 'student3@mail.com' },
  { project: projectData[0], name: 'Student 4', email: 'student4@mail.com' },
  { project: projectData[0], name: 'Student 5', email: 'student5@mail.com' },
];

const assignmentData: EntityData<Assignment>[] = [
  { project: projectData[0], name: 'Assignment 1', description: 'Description 1' },
  { project: projectData[0], name: 'Assignment 2', description: 'Description 2' },
  { project: projectData[0], name: 'Assignment 3', description: 'Description 3' },
];

const gradingData: EntityData<Grading>[] = [
  { assignment: assignmentData[0], name: 'Question 1', marks: 5 },
  { assignment: assignmentData[0], name: 'Question 2', marks: 5 },
  { assignment: assignmentData[0], name: 'Question 3', marks: 5 },
  { assignment: assignmentData[1], name: 'Question 1', marks: 5 },
  { assignment: assignmentData[1], name: 'Question 2', marks: 5 },
  { assignment: assignmentData[1], name: 'Question 3', marks: 5 },
  { assignment: assignmentData[2], name: 'Question 1', marks: 5 },
  { assignment: assignmentData[2], name: 'Question 2', marks: 5 },
  { assignment: assignmentData[2], name: 'Question 3', marks: 5 },
];

const scriptData: EntityData<Script>[] = [
  {
    assignment: assignmentData[0],
    student: studentData[0],
    file: 's3://test1',
    assignee: 1,
  },
  {
    assignment: assignmentData[0],
    student: studentData[1],
    file: 's3://test2',
    assignee: 1,
  },
  {
    assignment: assignmentData[0],
    student: studentData[2],
    file: 's3://test3',
    assignee: 1,
  },
  {
    assignment: assignmentData[0],
    student: studentData[3],
    file: 's3://test4',
    assignee: 1,
  },
  {
    assignment: assignmentData[0],
    student: studentData[4],
    file: 's3://test5',
    assignee: 1,
  },
  {
    assignment: assignmentData[1],
    student: studentData[0],
    file: 's3://test6',
    assignee: 1,
  },
  {
    assignment: assignmentData[1],
    student: studentData[1],
    file: 's3://test7',
    assignee: 1,
  },
  {
    assignment: assignmentData[1],
    student: studentData[2],
    file: 's3://test8',
    assignee: 1,
  },
  {
    assignment: assignmentData[1],
    student: studentData[3],
    file: 's3://test9',
    assignee: 1,
  },
  {
    assignment: assignmentData[1],
    student: studentData[4],
    file: 's3://test10',
    assignee: 1,
  },
];

const scriptGradeData: EntityData<ScriptGrade>[] = [
  { script: scriptData[0], grading: gradingData[0], grade: 5, comments: 'Good job!' },
  { script: scriptData[0], grading: gradingData[1], grade: 5, comments: 'Good job!' },
  { script: scriptData[0], grading: gradingData[2], grade: 5, comments: 'Good job!' },
];

const snippetData: EntityData<Snippet>[] = [
  { project: projectData[0], text: 'Good job!' },
  { project: projectData[0], text: 'Well done!' },
  { project: projectData[0], text: 'Keep it up!' },
  {
    project: projectData[0],
    assignment: assignmentData[0],
    text: 'You did a good job with assignment 1.',
  },
];

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    userData.map((i) => em.create(User, i));
    projectData.map((i) => em.create(Project, i));
    studentData.map((i) => em.create(Student, i));
    assignmentData.map((i) => em.create(Assignment, i));
    gradingData.map((i) => em.create(Grading, i));
    scriptData.map((i) => em.create(Script, i));
    scriptGradeData.map((i) => em.create(ScriptGrade, i));
    snippetData.map((i) => em.create(Snippet, i));
    await em.flush();
  }
}
