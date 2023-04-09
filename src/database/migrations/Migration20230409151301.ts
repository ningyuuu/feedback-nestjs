import { Migration } from '@mikro-orm/migrations';

export class Migration20230409151301 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "assignment" alter column "description" type text using ("description"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "assignment" alter column "description" type varchar(255) using ("description"::varchar(255));');
  }

}
