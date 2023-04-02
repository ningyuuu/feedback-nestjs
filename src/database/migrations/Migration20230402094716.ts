import { Migration } from '@mikro-orm/migrations';

export class Migration20230402094716 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "grading" ("id" serial primary key, "name" varchar(255) not null, "marks" int not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "grading" cascade;');
  }
}
