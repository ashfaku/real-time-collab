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

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const [existing] = await pool.execute(
        'SELECT id, username, email FROM users WHERE email = ? AND password = ?',
        [email, password]
      );
  
      if (existing.length > 0) {
        console.log("user exists.");
        console.log(existing);
        return res.status(200).json({ message: 'User exists.', user: existing[0] });
      }
      console.log("USer doesn't exist")
      return res.status(400).json({message: 'User doesn\'t exist.' });
    } 
    catch (error) {
      console.error('DB Error:', error);
      res.status(500).json({ message: 'Error saving data' });
    }
});

app.post('/createdoc', async (req, res) => {
  try {
    const { creator } = req.body;

    if (!creator) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert into database
    const [result] = await pool.execute(
      'INSERT INTO documents (doc_text, creator, doc_name) VALUES (?, ?, ?)',
      ["Empty", creator, "Untited Document"]
    );
    console.log('Inserted row ID:', result.insertId);
    res.status(200).json({ message: 'Created new document!', id: result.insertId });
  } 
  catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ message: 'Error saving data' });
  }
});


app.post("/getdoc", async (req, res) => {
  const { id, email } = req.body;

  if (!id || !email) {
    return res.status(400).json({ message: "Missing id or email" });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT * from documents where doc_id = ? && creator = ?`,
      [id, email]
    );
    console.log(rows);
    if (rows.length === 0) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.json({
      message: "Document exists.",
      document: rows[0],
      role: rows[0].role
    });
  } catch (err) {
    console.error("Error fetching document:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
