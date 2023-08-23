import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { getEnvironmentExecution, getEnvironmentFile } from 'src/infrastructure/common/utils/environment.util';

if (getEnvironmentExecution() === 'local') {
  dotenv.config({ path: getEnvironmentFile() });
};

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: false,
  schema: process.env.DATABASE_SCHEMA,
  migrationsRun: true,
  migrationsTableName: 'migration_weather',
  migrations: ['database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'database/migrations',
  },
};

export default config;