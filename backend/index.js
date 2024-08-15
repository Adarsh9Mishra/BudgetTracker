// const express = require('express')
// const cors = require('cors');
// const { db } = require('./db/db');
// const {readdirSync} = require('fs')
// const app = express()

// require('dotenv').config()

// const PORT = process.env.PORT

// //middlewares
// app.use(express.json())
// app.use(cors())

// //routes
// readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))


// const server = () => {
//     db()
//     app.listen(PORT, () => {
//         console.log('listening to port:', PORT)
//     })
// }

// server()

const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const path = require('path');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000; // Fallback port if environment variable is not set

//middlewares
app.use(express.json());
app.use(cors());

// Serve static files from the 'frontend/build' directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Serve the index.html from the build folder for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    });
};

server();




