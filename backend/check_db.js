const db = require('./db');

async function testConnection() {
    try {
        console.log('Attempting to connect to the database...');
        const [rows] = await db.query('SELECT * FROM interns');
        console.log('Successfully connected to database!');
        console.log(`Found ${rows.length} interns in the table.`);
        console.log('Data:', rows);
        process.exit(0);
    } catch (error) {
        console.error('Failed to connect or query database.');
        console.error('Error Details:', error.message);
        process.exit(1);
    }
}

testConnection();
