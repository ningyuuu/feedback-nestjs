import { Migration } from '@mikro-orm/migrations';

export class Migration20230409162523 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "script_grade" alter column "comments" type varchar(255) using ("comments"::varchar(255));');
    this.addSql('alter table "script_grade" alter column "comments" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "script_grade" alter column "comments" type varchar(255) using ("comments"::varchar(255));');
    this.addSql('alter table "script_grade" alter column "comments" set not null;');
  }

}
