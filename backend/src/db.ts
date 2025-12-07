import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: connectionString && connectionString.includes('localhost') ? false : {
        rejectUnauthorized: false
    },
});

export const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
};
