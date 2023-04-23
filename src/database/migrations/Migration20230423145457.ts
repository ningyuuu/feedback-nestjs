import { Migration } from '@mikro-orm/migrations';

export class Migration20230423145457 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "student" drop constraint "student_project_id_foreign";');

    this.addSql(
      'alter table "student" alter column "project_id" type int using ("project_id"::int);',
    );
    this.addSql('alter table "student" alter column "project_id" drop not null;');
    this.addSql(
      'alter table "student" add constraint "student_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "student" drop constraint "student_project_id_foreign";');

    this.addSql(
      'alter table "student" alter column "project_id" type int using ("project_id"::int);',
    );
    this.addSql('alter table "student" alter column "project_id" set not null;');
    this.addSql(
      'alter table "student" add constraint "student_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;',
    );
  }
}
