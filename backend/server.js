const express = require('express');

const cors = require('cors');

const app = express();
app.use(express.json());

const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  credentials: true,
}));
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected!');
});

app.post('/signup', (req, res) => {
    const data = req.body; 
    console.log('Received data from React:', data);

    res.status(200).json({ message: 'Data received successfully!' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});