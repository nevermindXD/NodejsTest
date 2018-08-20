import express from 'express';
import * as classICtrl from '../../controller/classI';
import {teacher_credentials} from '../../config/auth';

const app = express.Router();
app.group('/ClassI', (router) => {
	router
		.post('/', teacher_credentials,(req,res) => {
			const { _id } = req.user;
			classICtrl.addOneClass(req.body, _id)
				.then( () => { 
					res.status(200).json({message:'New class added successfully'});
				})
				.catch( () => {
					res.sendStatus(404);
				});
		})
		.get('/', teacher_credentials, (req,res) => {
			
			
			classICtrl.getAllClasses()
				.then( classesI => { 
					res.status(200).json(classesI);
				})
				.catch( () => {
					res.sendStatus(404);
				});
		})
		.get('/:idClass', teacher_credentials, (req,res) => {
			const {idClass} = req.params;
			classICtrl.getOneClass(idClass)
				.then( classI => { 
					res.status(200).json(classI);
				})
				.catch( () => {
					res.sendStatus(404);
				});
		})
		.put('/:idClass', teacher_credentials, (req,res) => {
			const {idClass} = req.params;
			classICtrl.updateOneClass(idClass, req.body)
				.then( classI => { 
					res.status(200).json(classI);
				})
				.catch( () => {
					res.sendStatus(404);
				});
		})
		.delete('/:idClass', teacher_credentials, (req,res) => {
			const {idClass} = req.params;
			classICtrl.deleteOneClass(idClass)
				.then( response => {
					res.status(410).json(response);
				}).catch(() => {
					res.sendStatus(404);
				});
		});
});

export default app;