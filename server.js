const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://oa:oa@cluster0.fyrwd6g.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.listen(5000);

app.post('/api/register', async (req, res, next) => {
    const { login, password, firstName, lastName } = req.body;
    const db = client.db('CarbonTrackerGPT');
    const error = '';

    try {
        const existingUser = await db.collection('Users').findOne({ Login: login });
        if (existingUser) {
            error = 'User with this login already exists';
        } else {
            const result = await db.collection('Users').insertOne({
                Login: login,
                Password: password,
                FirstName: firstName,
                LastName: lastName
            });
            if (result.insertedId) {
                res.status(200).json({ id: result.insertedId, error: '' });
                return;
            } else {
                error = 'User registration failed';
            }
        }
    } catch (e) {
        error = e.toString();
    }
    res.status(200).json({ id: -1, error: error });
});

app.post('/api/login', async (req, res, next) => {
    const error = '';
    const { login, password } = req.body;
    const db = client.db('CarbonTrackerGPT');
    const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();
    let id = -1;
    let fn = '';
    let ln = '';
    if (results.length > 0) {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }
    const ret = { id: id, firstName: fn, lastName: ln, error: '' };
    res.status(200).json(ret);
});

app.post('/api/trackCarbon', async (req, res, next) => {
    const { distance, vehicle } = req.body;

    const options = {
        method: 'GET',
        url: 'https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel',
        params: {
            distance: distance || '',
            vehicle: vehicle || ''
        },
        headers: {
            'X-RapidAPI-Key': 'b4306ba6e6msh94925cf0c0d0330p1d7fa4jsn16de956e44ea',
            'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'API request failed' });
    }
});
