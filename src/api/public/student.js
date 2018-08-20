import express from 'express';
import * as studentCtrl from '../../controller/student';
import {uploadImg,fileParser} from '../../config/cloudConect';

const app = express.Router();

app.group('/students', (router) => {
	router
		.post('/sign_in', (req,res) => {

			const { Mail, Password } = req.body;
			studentCtrl.logInStudent(Mail, Password)
				.then(response => {
					if (!response.hasOwnProperty('token')) {
						res.status(201).json({ message: response });
					}
					else {
						res.status(201).json(response);
					}
				})
				.catch(err => {
					res.status(200).send(err);
				});
		})
		.post('/', fileParser,uploadImg,(req,res) => {
			req.body.Picture = req.picture;
			studentCtrl.addOneStudent(req.body)
				.then( () => { 
					res.status(200).json({message:'New student added successfully'});
				})
				.catch( () => {
					res.sendStatus(404);
				});
		});
});

export default app;