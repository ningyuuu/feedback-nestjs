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
  { name: 'CS6460 Education Technology', period: 'Fall 2023', owner: 1 },
];

const studentData: EntityData<Student>[] = [
  { project: 1, name: 'Student 1', email: 'student1@mail.com' },
  { project: 1, name: 'Student 2', email: 'student2@mail.com' },
  { project: 1, name: 'Student 3', email: 'student3@mail.com' },
  { project: 1, name: 'Student 4', email: 'student4@mail.com' },
  { project: 1, name: 'Student 5', email: 'student5@mail.com' },
];

const assignmentData: EntityData<Assignment>[] = [
  {
    project: 1,
    name: 'Assignment 1',
    description: `<p>Assignment 1 has two parts. The first, the Research Log, is a structured opportunity for you to report to your mentor and classmates the progress you've made this week in exploring the literature and refining your idea. Each assignment until the Qualifier Question, you'll submit a new Research Log documenting your research progress since the last week. The second, the Activity, is a more structured opportunity to practice one of the skills you'll need as you move forward in the class. Each part is worth 50% of this assignment's grade.</p><br />

    <p>Research Log</p><br />
    <p>First, if you haven't already, you probably want to peek forward at the Qualifier Question and the Project Proposal assignments. These first several assignments build toward those, so it would be useful to understand where you're trying to get!</p>
    <p>The goal of these first several assignments is have a general project idea in time to receive a Qualifier Question. However, different students will enter the class at different places in that pursuit. Some of you entered the class already knowing exactly what you want to work on. Others of you need some time to explore. In either case, though, there is research to be done: if you're in the former group, your research is to find what others have done in your area so you know how to contribute. If you're in the latter group, your research is to find what you might be interested in doing and how you can contribute to the community.</p>
    <p>The Research Guide is there to help you explore the literature no matter what ideas you have as you enter the class. In each of the next three weeks, you're going to complete a Research Log that documents your growing understanding of the literature. The goal of this research log is to give you an ordered, formal structure for organizing your growing understanding of the research domain you want to enter. Each of the three research logs will follow the same structure, intended to capture your progress regardless of where in the process you are—both entering the class and as the class progress.</p>`,
  },
  {
    project: 1,
    name: 'Assignment 2',
    description:
      "Assignment 2 has two parts. The first, the Research Log, is a structured opportunity for you to report to your mentor and classmates the progress you've made this week in exploring the literature and refining your idea. Each assignment until the Qualifier Question, you'll submit a new Research Log documenting your research progress since the last week. The second, the Activity, is a more structured opportunity to practice one of the skills you'll need as you move forward in the class. Each part is worth 50% of this assignment's grade.",
  },
  {
    project: 1,
    name: 'Assignment 3',
    description: `<p>Assignment 3 has two parts. The first, the Research Log, is a structured opportunity for you to report to your mentor and classmates the progress you've made this week in exploring the literature and refining your idea. Each assignment until the Qualifier Question, you'll submit a new Research Log documenting your research progress since the last week. The second, the Activity, is a more structured opportunity to practice one of the skills you'll need as you move forward in the class. Each part is worth 50% of this assignment's grade.</p>
<b>Research Log</b><br /><br />
<p>Your Research Log for assignment 3 follows the same procedure as that for assignments 1 and 2. At this point, though, we would expect most people to have a decent idea for what they would like to work on, and this week should be spent refining that idea with sources more closely related to your interests. As with last week, you'll begin by summarizing your progress entering the week, then provide an itemization of your exploration for the week, the synthesize that with what you've explored before, reflect on the process, and plan for the next stage of the class. Take a look at the Qualifier Question and Proposal requirements to understand a bit more about why you're gathering these sources; your Research Log is intended to prepare you for these upcoming assignments. </p>
<p>Your Research Log for this week should be all-new material (as you aren't repeating the same research you did last week!), but you can include your previous Logs as appendices if you think they provide useful context to your peer reviewers.</p>`,
  },
];

const gradingData: EntityData<Grading>[] = [
  { assignment: 1, name: 'Question 1', marks: 5 },
  { assignment: 1, name: 'Question 2', marks: 5 },
  { assignment: 1, name: 'Question 3', marks: 5 },
  { assignment: 2, name: 'Question 1', marks: 5 },
  { assignment: 2, name: 'Question 2', marks: 5 },
  { assignment: 2, name: 'Question 3', marks: 5 },
  { assignment: 3, name: 'Question 1', marks: 5 },
  { assignment: 3, name: 'Question 2', marks: 5 },
  { assignment: 3, name: 'Question 3', marks: 5 },
];

const scriptData: EntityData<Script>[] = [
  {
    assignment: 1,
    student: 1,
    file: 's3://test1',
    assignee: 1,
  },
  {
    assignment: 1,
    student: 2,
    file: 's3://test2',
    assignee: 1,
  },
  {
    assignment: 1,
    student: 3,
    file: 's3://test3',
    assignee: 1,
  },
  {
    assignment: 1,
    student: 4,
    file: 's3://test4',
    assignee: 1,
  },
  {
    assignment: 1,
    student: 5,
    file: 's3://test5',
    assignee: 1,
  },
  {
    assignment: 2,
    student: 1,
    file: 's3://test6',
    assignee: 1,
  },
  {
    assignment: 2,
    student: 2,
    file: 's3://test7',
    assignee: 1,
  },
  {
    assignment: 2,
    student: 3,
    file: 's3://test8',
    assignee: 1,
  },
  {
    assignment: 2,
    student: 4,
    file: 's3://test9',
    assignee: 1,
  },
  {
    assignment: 2,
    student: 5,
    file: 's3://test10',
    assignee: 1,
  },
];

const scriptGradeData: EntityData<ScriptGrade>[] = [
  { script: 1, grading: 1, grade: 5, comments: 'Good job!' },
  { script: 1, grading: 2, grade: 5, comments: 'Good job!' },
  { script: 1, grading: 3, grade: 5, comments: 'Good job!' },
];

const snippetData: EntityData<Snippet>[] = [
  {
    project: 1,
    text: 'Good job with the assignment. You have done well and met all the expectations of the assignment.',
  },
  {
    project: 1,
    text: 'Good job with the assignment. You have done the first part well, but the activity is too short. Here are some ways you can improve.',
  },
  {
    project: 1,
    text: 'Good job with the assignment. You have done the activity well, but the research log is lacking. Here are some ways you can improve.',
  },
  {
    assignment: 1,
    text: 'Your response was lacking in answering the prompt provided. You have a good central thesis, but this thesis was not at all supported by any of the arguments you made in the response. For your first argument, there was no clear link from the cause of income inequality to the impact on MOOC dropouts. For your second argument, although there was a good argument for socioeconomic status, there was no evidence or citations provided to back up this claim. Overall, there is room for improvement in the logical flow of the entire response. I would suggest looking at your arguments critically to see if you could make them more robust, and provide more evidence for your claims.',
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
