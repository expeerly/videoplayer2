import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  min: 0,
  max: 10,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 8000,
  allowExitOnIdle: true,
  keepAlive: true,
});

export const db = drizzle(pool, { schema });

pool.on('error', err => {
  console.error('Pool error:', err);
});

pool.on('connect', client => {
  client.on('error', err => {
    console.error('Client specific error:', err);
  });
});
