const { Client } = require('pg');

// Trying Supabase Pooler URL (SA-East-1 region usually for BR)
// Connection String format: postgres://[user].[project]:[pass]@[pooler-host]:6543/[db]
const password = encodeURIComponent('Omd#2026NewSite');

// Assuming region is 'aws-0-sa-east-1' (common for BR).
// Username must be 'postgres.lriapvoderqzvecjezpe' for pooler.
const connectionString = `postgresql://postgres.lriapvoderqzvecjezpe:${password}@aws-0-sa-east-1.pooler.supabase.com:6543/postgres`;

console.log('Attempting connection...');

const client = new Client({
    connectionString: connectionString,
});

async function verifyConnection() {
    try {
        await client.connect();
        const res = await client.query('SELECT NOW() as current_time');
        console.log('Success! Connected to database. Current time:', res.rows[0].current_time);
        await client.end();
    } catch (err) {
        console.error('Connection failed:', err);
        process.exit(1);
    }
}

verifyConnection();
