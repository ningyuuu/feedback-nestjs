import { Migration } from '@mikro-orm/migrations';

export class Migration20230402094938 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "student" ("id" serial primary key, "project_id" int not null, "name" varchar(255) not null, "email" varchar(255) not null);',
    );

    this.addSql(
      'alter table "student" add constraint "student_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;',
    );

    this.addSql('alter table "grading" add column "assignment_id" int not null;');
    this.addSql(
      'alter table "grading" add constraint "grading_assignment_id_foreign" foreign key ("assignment_id") references "assignment" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "student" cascade;');

    this.addSql('alter table "grading" drop constraint "grading_assignment_id_foreign";');

    this.addSql('alter table "grading" drop column "assignment_id";');
  }
}
