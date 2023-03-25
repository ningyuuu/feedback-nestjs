import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { join } from 'node:path';

const config: Options = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  type: 'postgresql',
  seeder: {
    path: join(__dirname, 'seeders'),
  },
  migrations: {
    path: join(__dirname, 'migrations'),
  },
  metadataProvider: TsMorphMetadataProvider,
  cache: { enabled: false },
};

export default config;
