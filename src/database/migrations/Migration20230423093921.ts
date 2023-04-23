import { Migration } from '@mikro-orm/migrations';

export class Migration20230423093921 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "project_instructors" ("project_id" int not null, "user_id" int not null, constraint "project_instructors_pkey" primary key ("project_id", "user_id"));',
    );

    this.addSql(
      'alter table "project_instructors" add constraint "project_instructors_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "project_instructors" add constraint "project_instructors_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "project_instructors" cascade;');
  }
}
