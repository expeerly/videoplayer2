import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Create a singleton pool instance
let pool: Pool;

const createPool = () => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 50, // Reduced from 200 to prevent connection overload
      min: 2, // Minimum number of connections in pool
      idleTimeoutMillis: 30000, // Close idle connections after 30s
      connectionTimeoutMillis: 5000, // Connection timeout after 5s
      allowExitOnIdle: true,
      keepAlive: true, // Enable TCP keepalive
      keepAliveInitialDelayMillis: 10000,
    });

    // Error handling
    pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
      // Try to reconnect
      client.release(true);
    });

    // Connection monitoring
    pool.on('connect', () => {
      console.log('New database connection established');
    });

    pool.on('acquire', () => {
      console.log('Connection acquired from pool');
    });

    pool.on('remove', () => {
      console.log('Connection removed from pool');
    });
  }
  return pool;
};

// Get or create pool
const getPool = () => {
  if (!pool) {
    return createPool();
  }
  return pool;
};

// Export database instance
export const db = drizzle(getPool(), { schema });

// Health check with retry mechanism
export const checkDatabaseConnection = async (retries = 3) => {
  const pool = getPool();

  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      try {
        await client.query('SELECT 1'); // Test query
        return true;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error(`Database connection attempt ${i + 1} failed:`, err);
      if (i === retries - 1) {
        return false;
      }
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, i), 10000)));
    }
  }
  return false;
};

// Graceful shutdown
export const closePool = async () => {
  if (pool) {
    try {
      await pool.end();
      console.log('Database pool closed successfully');
    } catch (err) {
      console.error('Error closing database pool:', err);
      throw err;
    }
  }
};
