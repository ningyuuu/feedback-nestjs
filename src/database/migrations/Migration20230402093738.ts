import { Migration } from '@mikro-orm/migrations';

export class Migration20230402093738 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "assignment" ("id" serial primary key, "project_id" int not null, "name" varchar(255) not null, "description" varchar(255) not null);',
    );

    this.addSql(
      'alter table "assignment" add constraint "assignment_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "assignment" cascade;');
  }
}
