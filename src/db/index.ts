import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  // database: 'postgres',
  // port: 5432,
  // host: 'aws-0-eu-west-3.pooler.supabase.com',
  // user: 'postgres.emfefanbreswyypecnjx',
  // password: 'pKs9ETAdxA3Kj06V',
  min: 0, // Start with no connections
  max: 10, // Reduce max connections
  idleTimeoutMillis: 5000, // Reduce idle timeout
  connectionTimeoutMillis: 8000,
  allowExitOnIdle: true,
  keepAlive: true,
});

export const db = drizzle(pool, { schema });

// Improved error handling with reconnection logic
pool.on('error', err => {
  console.error('Pool error:', err);
  // The pool will automatically handle reconnection
});

pool.on('connect', client => {
  client.on('error', err => {
    console.error('Client specific error:', err);
  });
});

// Monitor pool health less frequently
setInterval(() => {
  const status = {
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount,
  };
  console.log('Pool status:', status);
}, 10000);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Closing pool connections...');
  await pool.end();
  console.log('Pool has ended');
});
