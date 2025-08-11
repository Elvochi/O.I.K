const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔄 Setting up database...');
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Elvochi0.'
    };
    console.log(`📡 Connecting to MySQL at ${config.host}...`);
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL server');
    const dbName = process.env.DB_NAME || 'construction_db';
    console.log(`🏗️  Creating database '${dbName}'...`);
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' created successfully`);
    await connection.execute(`USE \`${dbName}\``);
    console.log(`📂 Using database '${dbName}'`);
    console.log('🏗️  Creating signups table...');
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
    console.log('✅ Signups table created successfully');
    console.log('🏗️  Creating admin users table...');
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
    console.log('✅ Admin users table created successfully');
    console.log('🏗️  Checking for existing data...');
    const [existingData] = await connection.execute('SELECT COUNT(*) as count FROM signups');
    if (existingData[0].count === 0) {
      console.log('📝 No existing data found. Would you like to insert sample data? (Skipping for now)');
      const sampleData = `
        INSERT INTO signups (first_name, last_name, email, phone, company, project_type, message, status) VALUES
        ('John', 'Doe', 'john.doe@example.com', '+1234567890', 'ABC Corp', 'commercial', 'Looking for office building construction', 'pending'),
        ('Jane', 'Smith', 'jane.smith@example.com', '+1987654321', NULL, 'residential', 'Need home renovation', 'contacted'),
        ('Mike', 'Johnson', 'mike.johnson@example.com', '+1122334455', 'XYZ Inc', 'consultation', 'Initial consultation needed', 'converted')
      `;
      
      await connection.execute(sampleData);
      console.log('✅ Sample data inserted');
      
    } else {
      console.log(`📊 Found ${existingData[0].count} existing records`);
    }
    console.log('🧪 Testing database setup...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 Tables in database:', tables.map(row => Object.values(row)[0]));
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Make sure your .env file has the correct database credentials');
    console.log('2. Run your Node.js server with: npm run dev');
    console.log('3. Test the connection at: http://localhost:5000/api/health');
    
  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n🔧 Troubleshooting:');
      console.error('- Check your MySQL username and password in .env file');
      console.error('- Make sure the MySQL user has CREATE DATABASE privileges');
      console.error('- Try connecting with: mysql -u root -p');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n🔧 Troubleshooting:');
      console.error('- Make sure MySQL server is running');
      console.error('- Check if MySQL is running on the correct port (default: 3306)');
      console.error('- Windows: Check MySQL service in Services');
      console.error('- Mac: brew services start mysql');
      console.error('- Linux: sudo systemctl start mysql');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;