const express = require('express');
require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool.getConnection()
  .then(() => console.log('Connected to MySQL!'))
  .catch(err => console.error('DB connection error:', err));

app.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert into database
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, password, email]
    );
    console.log('Inserted row ID:', result.insertId);
    res.status(200).json({ message: 'User signed up successfully!', id: result.insertId });
  } 
  catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ message: 'Error saving data' });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
