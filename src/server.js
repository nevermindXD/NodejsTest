require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import config from './config/db';
import cors from './middleware/cors';
import helmet from 'helmet';
import 'express-group-routes';
import { mongooseConnection } from './utils/connection';
import API_PRIVATE from './api/private';
import API_PUBLIC from './api/public';
const PORT = process.env.PORT || 3001;
const DB = process.env.MONGODB_URI || config.prod;


const app = express();
app.use(bodyParser.json());// Parse the request body into a more usabel object
app.use(bodyParser.urlencoded({ extended: true }));//Parse the request body into a www-url-encoded
app.use(cors);
app.use(helmet());
app.disable('x-powered-by'); //Disable x-powered-by in rest

app.use(cors);


mongooseConnection(DB);

app.get('/', (req, res) => {
	res.send('Hello Bosch :)');
});

app.use('/', API_PRIVATE);
app.use('/', API_PUBLIC);
app.enable('trust proxy');



app.listen(PORT, err => {
	if (!err)
		console.log('App running on http://localhost:' + PORT);
	else
		console.log('Error running app ', err);
});