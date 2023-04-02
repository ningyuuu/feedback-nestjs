import { Migration } from '@mikro-orm/migrations';

export class Migration20230402093452 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "project" ("id" serial primary key, "name" varchar(255) not null, "period" varchar(255) not null, "owner" varchar(255) not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "project" cascade;');
  }
}
