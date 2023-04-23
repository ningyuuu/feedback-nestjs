import { Migration } from '@mikro-orm/migrations';

export class Migration20230423182232 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "script" drop constraint "script_assignment_id_foreign";');

    this.addSql(
      'alter table "script" alter column "assignment_id" type int using ("assignment_id"::int);',
    );
    this.addSql('alter table "script" alter column "assignment_id" drop not null;');
    this.addSql(
      'alter table "script" add constraint "script_assignment_id_foreign" foreign key ("assignment_id") references "assignment" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "script" drop constraint "script_assignment_id_foreign";');

    this.addSql(
      'alter table "script" alter column "assignment_id" type int using ("assignment_id"::int);',
    );
    this.addSql('alter table "script" alter column "assignment_id" set not null;');
    this.addSql(
      'alter table "script" add constraint "script_assignment_id_foreign" foreign key ("assignment_id") references "assignment" ("id") on update cascade;',
    );
  }
}
