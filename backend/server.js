const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const initialDbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Elvochi0.',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const dbConfig = {
  ...initialDbConfig,
  database: process.env.DB_NAME || 'construction_db'
};

let pool;

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    const initialConnection = await mysql.createConnection(initialDbConfig);
    const dbName = process.env.DB_NAME || 'construction_db';
    await initialConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' created or already exists`);
    await initialConnection.end();
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();

    const createSignupsTable = `
      CREATE TABLE IF NOT EXISTS signups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        company VARCHAR(255),
        project_type ENUM('residential', 'commercial', 'renovation', 'consultation', 'other') NOT NULL,
        message TEXT,
        status ENUM('pending', 'contacted', 'converted', 'declined') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      )
    `;
    await connection.execute(createSignupsTable);
    console.log('Signups table created or already exists');

    const createAdminTable = `
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'manager') DEFAULT 'manager',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await connection.execute(createAdminTable);
    console.log('Admin users table created or already exists');

    connection.release();
    console.log('Database initialized successfully');

    } catch (error) {
    console.error('Database initialization error:', error);

    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('❌ Access denied. Please check your MySQL username and password in the .env file');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Connection refused. Please make sure MySQL server is running');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('❌ Database error. This should be handled now, but if you see this, there might be a permission issue');
    }
    
    process.exit(1);
  }
}

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

app.get('/api/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    database: dbStatus ? 'Connected' : 'Disconnected'
  });
});

app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, phone, company, projectType, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !projectType) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }
  
  try {
    if (!pool) {
      return res.status(500).json({
        success: false,
        message: 'Database not initialized'
      });
    }
    
    const connection = await pool.getConnection();
    const [existingUser] = await connection.execute(
      'SELECT id FROM signups WHERE email = ?',
      [email]
    );
    
    if (existingUser.length > 0) {
      connection.release();
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }
    const insertQuery = `
      INSERT INTO signups (first_name, last_name, email, phone, company, project_type, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await connection.execute(insertQuery, [
      firstName,
      lastName,
      email,
      phone,
      company || null,
      projectType,
      message || null
    ]);
    
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Sign up successful',
      data: {
        id: result.insertId,
        firstName,
        lastName,
        email
      }
    });
    console.log(`✅ New signup: ${firstName} ${lastName} - ${email} - ${projectType}`);
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/api/signups', async (req, res) => {
  try {
    if (!pool) {
      return res.status(500).json({
        success: false,
        message: 'Database not initialized'
      });
    }
    
    const { status, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM signups';
    let params = [];
    
    if (status && status !== 'all') {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const connection = await pool.getConnection();
    const [signups] = await connection.execute(query, params);
    connection.release();
    
    res.json({
      success: true,
      data: signups,
      count: signups.length
    });
    
  } catch (error) {
    console.error('Get signups error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.patch('/api/signups/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['pending', 'contacted', 'converted', 'declined'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status'
    });
  }
  
  try {
    if (!pool) {
      return res.status(500).json({
        success: false,
        message: 'Database not initialized'
      });
    }
    
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'UPDATE signups SET status = ? WHERE id = ?',
      [status, id]
    );
    
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Signup not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Status updated successfully'
    });
    
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    if (!pool) {
      return res.status(500).json({
        success: false,
        message: 'Database not initialized'
      });
    }
    
    const connection = await pool.getConnection();
    
    // Get counts by status
    const [statusCounts] = await connection.execute(`
      SELECT status, COUNT(*) as count 
      FROM signups 
      GROUP BY status
    `);
    const [totalCount] = await connection.execute('SELECT COUNT(*) as total FROM signups');
    const [recentCount] = await connection.execute(`
      SELECT COUNT(*) as recent 
      FROM signups 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    `);
    
    connection.release();
    
    res.json({
      success: true,
      data: {
        total: totalCount[0].total,
        recent: recentCount[0].recent,
        byStatus: statusCounts
      }
    });
    
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
}

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  if (pool) {
    await pool.end();
    console.log('📊 Database connections closed');
  }
  process.exit(0);
});

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

module.exports = app;