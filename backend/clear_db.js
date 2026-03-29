const mysql = require('mysql2/promise');
require('dotenv').config();

async function clearDummyData() {
    try {
        console.log('Connecting to database...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'uit_tracker_db'
        });

        console.log('Truncating interns table...');
        await connection.query('TRUNCATE TABLE interns');
        console.log('Success! All dummy interns removed.');

        connection.end();
        process.exit(0);
    } catch (e) {
        console.error('Error clearing data:', e.message);
        process.exit(1);
    }
}

clearDummyData();
