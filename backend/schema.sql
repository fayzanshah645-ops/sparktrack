CREATE DATABASE IF NOT EXISTS uit_tracker_db;
USE uit_tracker_db;

-- Users table (e.g., admins, HR, managers who log into the system)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interns table (matching frontend needs)
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
);
