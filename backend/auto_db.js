const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAndSeed() {
    try {
        console.log('Connecting to MySQL...');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'uit_tracker_db',
            multipleStatements: true
        });

        console.log('Connected! Creating tables...');
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'admin',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS interns (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                stage INT DEFAULT 1,
                badge VARCHAR(100) DEFAULT 'Explorer',
                attendance INT DEFAULT 0,
                tasks INT DEFAULT 0,
                streak INT DEFAULT 0,
                status VARCHAR(50) DEFAULT '绿',
                initials VARCHAR(10),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Tables created successfully. Checking if we need to seed...');
        
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM interns');
        if (rows[0].count === 0) {
            console.log('Seeding initial intern data...');
            await connection.query(`
                INSERT INTO interns (name, stage, badge, attendance, tasks, streak, status, initials) VALUES
                ('Amir Ali', 2, 'Practitioner', 85, 12, 5, '绿', 'AA'),
                ('Sara Fatima', 1, 'Explorer', 92, 5, 12, '绿', 'SF'),
                ('Kaleem Mir', 2, 'Practitioner', 78, 10, 0, '黄', 'KM'),
                ('Rayan Ahmad', 3, 'Allied', 96, 18, 18, '绿', 'RA'),
                ('Zara Ahmed', 1, 'Explorer', 45, 2, 0, '红', 'ZA')
            `);
            console.log('Seeding completed!');
        } else {
            console.log('Data already exists, skipping seed.');
        }

        console.log('Database setup is 100% complete.');
        connection.end();
        process.exit(0);

    } catch (error) {
        console.error('An error occurred during DB initialization:', error.message);
        process.exit(1);
    }
}

createAndSeed();
