import { Migration } from '@mikro-orm/migrations';

export class Migration20230409082004 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "snippet" drop constraint "snippet_project_id_foreign";');

    this.addSql(
      'alter table "snippet" alter column "project_id" type int using ("project_id"::int);',
    );
    this.addSql('alter table "snippet" alter column "project_id" drop not null;');
    this.addSql(
      'alter table "snippet" add constraint "snippet_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "snippet" drop constraint "snippet_project_id_foreign";');

    this.addSql(
      'alter table "snippet" alter column "project_id" type int using ("project_id"::int);',
    );
    this.addSql('alter table "snippet" alter column "project_id" set not null;');
    this.addSql(
      'alter table "snippet" add constraint "snippet_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;',
    );
  }
}
