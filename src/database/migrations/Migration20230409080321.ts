import { Migration } from '@mikro-orm/migrations';

export class Migration20230409080321 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "snippet" add column "user_id" int null;');
    this.addSql(
      'alter table "snippet" add constraint "snippet_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "snippet" drop constraint "snippet_user_id_foreign";');

    this.addSql('alter table "snippet" drop column "user_id";');
  }
}
