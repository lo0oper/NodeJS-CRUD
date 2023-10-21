
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // Import the cors package


const app = express();

app.use(cors({origin:"*"}));
app.use(bodyParser.json());



app.get('/api/v1/healthcheck', (req, res) => {
    res.status(200).send('Application is Online');
});

// userRoutes
app.use('/api/v1/user', userRoutes);

// AuthRoutes
app.use('/api/v1/auth', authRoutes);

app.listen(3000,()=>console.log('Crud Application is live on localhost:3000'));
