import { Migration } from '@mikro-orm/migrations';

export class Migration20230423133702 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "student" add constraint "student_name_project_id_unique" unique ("name", "project_id");',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "student" drop constraint "student_name_project_id_unique";');
  }
}
