import { Migration } from '@mikro-orm/migrations';

export class Migration20230415093732 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "project" add column "owner_id" int not null;');
    this.addSql(
      'alter table "project" add constraint "project_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;',
    );
    this.addSql('alter table "project" drop column "owner";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "project" drop constraint "project_owner_id_foreign";');

    this.addSql('alter table "project" add column "owner" varchar(255) not null;');
    this.addSql('alter table "project" drop column "owner_id";');
  }
}
