import { Migration } from '@mikro-orm/migrations';

export class Migration20230402122548 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "script" drop constraint "script_assignee_id_foreign";');

    this.addSql(
      'alter table "script" alter column "assignee_id" type int using ("assignee_id"::int);',
    );
    this.addSql('alter table "script" alter column "assignee_id" drop not null;');
    this.addSql(
      'alter table "script" add constraint "script_assignee_id_foreign" foreign key ("assignee_id") references "user" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "script" drop constraint "script_assignee_id_foreign";');

    this.addSql(
      'alter table "script" alter column "assignee_id" type int using ("assignee_id"::int);',
    );
    this.addSql('alter table "script" alter column "assignee_id" set not null;');
    this.addSql(
      'alter table "script" add constraint "script_assignee_id_foreign" foreign key ("assignee_id") references "user" ("id") on update cascade;',
    );
  }
}
