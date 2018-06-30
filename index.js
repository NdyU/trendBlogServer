//Module for setting up local environment variables
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const http = require('http');

const config = require('./config.js');

const app = express();

app.use(cookieParser());

// Library for allowing cross-origin access
const cors = require('cors');

const corsOptions = {
  origin: config.client.url,
  optionsSuccessStatus: 200
}

// Using the Middlewire to allow CROSS-ORIGIN-ACCESS-POLICY
app.use(cors(corsOptions));

//router.js define all routes in this server
const router = require('./router');
// Passing app to routers, using router.js to define all the routes
router(app);

const port  = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
console.log("Server is running on port: " + port);
