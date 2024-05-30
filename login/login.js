const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 3000;

// Configuration de la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydatabase'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) throw err;
        res.send('User registered');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const comparison = await bcrypt.compare(password, results[0].password);
            if (comparison) {
                req.session.userId = results[0].id;
                res.send('Login successful');
            } else {
                res.send('Incorrect password');
            }
        } else {
            res.send('No user found with that email');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
