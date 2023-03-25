import { Seeder } from '@mikro-orm/seeder';
import { EntityData, EntityManager } from '@mikro-orm/core';
import { User } from 'src/users/entities/user.entity';

const userData: EntityData<User>[] = [
  { login: 'anntay@gmail.com', name: 'Ann Tay', password: '123' },
  { login: 'johnlim@gmail.com', name: 'John Lim', password: '123' },
  { login: 'harryteo@gmail.com', name: 'Harry Teo', password: '123' },
  { login: 'richardlee@gmail.com', name: 'Richard Lee', password: '123' },
  { login: 'charlotteau@gmail.com', name: 'Nur Halizah', password: '123' },
  { login: 'rebeccaloh@gmail.com', name: 'Kavitha Raju', password: '123' },
  { login: 'martintay@gmail.com', name: 'Martin Tay', password: '123' },
  { login: 'sarahpeh@gmail.com', name: 'Sarah Peh', password: '123' },
  { login: 'joeylee@gmail.com', name: 'Joey Lee', password: '789' },
];

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    userData.map((i) => em.create(User, i));
    await em.flush();
  }
}
