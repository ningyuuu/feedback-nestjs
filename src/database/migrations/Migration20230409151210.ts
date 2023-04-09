import { Migration } from '@mikro-orm/migrations';

export class Migration20230409151210 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "snippet" alter column "text" type text using ("text"::text);');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "snippet" alter column "text" type varchar(255) using ("text"::varchar(255));',
    );
  }
}
