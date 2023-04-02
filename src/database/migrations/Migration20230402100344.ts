import { Migration } from '@mikro-orm/migrations';

export class Migration20230402100344 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "script" ("id" serial primary key, "assignment_id" int not null, "file" varchar(255) not null, "assignee_id" int not null);',
    );

    this.addSql(
      'create table "script_grade" ("id" serial primary key, "script_id" int not null, "grading_id" int not null, "grade" int not null, "comments" varchar(255) not null);',
    );

    this.addSql(
      'alter table "script" add constraint "script_assignment_id_foreign" foreign key ("assignment_id") references "assignment" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "script" add constraint "script_assignee_id_foreign" foreign key ("assignee_id") references "user" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "script_grade" add constraint "script_grade_script_id_foreign" foreign key ("script_id") references "script" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "script_grade" add constraint "script_grade_grading_id_foreign" foreign key ("grading_id") references "grading" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "script_grade" drop constraint "script_grade_script_id_foreign";');

    this.addSql('drop table if exists "script" cascade;');

    this.addSql('drop table if exists "script_grade" cascade;');
  }
}
