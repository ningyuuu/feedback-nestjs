import { Migration } from '@mikro-orm/migrations';

export class Migration20230402171211 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "script" add column "student_id" int not null;');
    this.addSql(
      'alter table "script" add constraint "script_student_id_foreign" foreign key ("student_id") references "student" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "script" drop constraint "script_student_id_foreign";');

    this.addSql('alter table "script" drop column "student_id";');
  }
}
