import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import * as db from '../../config/db';

const dbProvider = {
  provide: 'PG_CONNECTION',
  useValue: new Pool({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
