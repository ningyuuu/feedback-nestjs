import { Migration } from '@mikro-orm/migrations';

export class Migration20230423150227 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "script_grade" drop constraint "script_grade_script_id_foreign";');

    this.addSql(
      'alter table "script_grade" alter column "script_id" type int using ("script_id"::int);',
    );
    this.addSql('alter table "script_grade" alter column "script_id" drop not null;');
    this.addSql(
      'alter table "script_grade" add constraint "script_grade_script_id_foreign" foreign key ("script_id") references "script" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "script_grade" drop constraint "script_grade_script_id_foreign";');

    this.addSql(
      'alter table "script_grade" alter column "script_id" type int using ("script_id"::int);',
    );
    this.addSql('alter table "script_grade" alter column "script_id" set not null;');
    this.addSql(
      'alter table "script_grade" add constraint "script_grade_script_id_foreign" foreign key ("script_id") references "script" ("id") on update cascade;',
    );
  }
}
