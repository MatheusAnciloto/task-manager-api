const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('../src/routes');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);
app.listen(process.env.PORT)