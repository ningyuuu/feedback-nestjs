import { Migration } from '@mikro-orm/migrations';

export class Migration20230325172226 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "login" varchar(255) not null, "password" varchar(255) not null, "name" varchar(255) not null default \'\', "admin" boolean not null default false);',
    );
    this.addSql('alter table "user" add constraint "user_login_unique" unique ("login");');
  }
}
