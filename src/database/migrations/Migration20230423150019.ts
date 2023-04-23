import { Migration } from '@mikro-orm/migrations';

export class Migration20230423150019 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "student" drop constraint "student_project_id_foreign";');

    this.addSql('alter table "script" drop constraint "script_student_id_foreign";');

    this.addSql(
      'alter table "student" alter column "project_id" type int using ("project_id"::int);',
    );
    this.addSql('alter table "student" alter column "project_id" set not null;');
    this.addSql(
      'alter table "student" add constraint "student_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "script" alter column "student_id" type int using ("student_id"::int);',
    );
    this.addSql('alter table "script" alter column "student_id" drop not null;');
    this.addSql(
      'alter table "script" add constraint "script_student_id_foreign" foreign key ("student_id") references "student" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "student" drop constraint "student_project_id_foreign";');

    this.addSql('alter table "script" drop constraint "script_student_id_foreign";');

    this.addSql(
      'alter table "student" alter column "project_id" type int using ("project_id"::int);',
    );
    this.addSql('alter table "student" alter column "project_id" drop not null;');
    this.addSql(
      'alter table "student" add constraint "student_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "script" alter column "student_id" type int using ("student_id"::int);',
    );
    this.addSql('alter table "script" alter column "student_id" set not null;');
    this.addSql(
      'alter table "script" add constraint "script_student_id_foreign" foreign key ("student_id") references "student" ("id") on update cascade;',
    );
  }
}
