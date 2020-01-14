const express = require('express');
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3000;
const apiKeyOWM = process.env.owmApiKey;

app.use(express.static('client'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
