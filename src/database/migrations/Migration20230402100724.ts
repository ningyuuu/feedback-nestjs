import { Migration } from '@mikro-orm/migrations';

export class Migration20230402100724 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "snippet" ("id" serial primary key, "project_id" int not null, "assignment_id" int null, "text" varchar(255) not null);');

    this.addSql('alter table "snippet" add constraint "snippet_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;');
    this.addSql('alter table "snippet" add constraint "snippet_assignment_id_foreign" foreign key ("assignment_id") references "assignment" ("id") on update cascade on delete set null;');

    this.addSql('alter table "script_grade" add constraint "script_grade_script_id_grading_id_unique" unique ("script_id", "grading_id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "snippet" cascade;');

    this.addSql('alter table "script_grade" drop constraint "script_grade_script_id_grading_id_unique";');
  }

}
