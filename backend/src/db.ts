import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Required for some hosted databases like Render/Heroku
    }
});

export const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
};
