import express from 'express';
import * as studentCtrl from '../../controller/student';
import {teacher_credentials,student_credentials} from '../../config/auth';



const app = express.Router();
app.group('/students', (router) => {
	router
		.get('/', teacher_credentials, (req,res) => {
			studentCtrl.getAllStudent()
				.then( teachers => {
					res.status(200).json(teachers);
				}).catch( () => {
					res.sendStatus(404);
				});
		})
		.get('/:idStudent', teacher_credentials, (req,res) => {
			const {idStudent} = req.params;

			studentCtrl.getOneStudent(idStudent)
				.then( student => {
					res.status(200).json(student);
				}).catch( () => {
					res.sendStatus(404);
				});
		})
		.put('/:idStudent', teacher_credentials, (req,res) => {
			const {idStudent} = req.params;

			studentCtrl.updateOneStudent(idStudent,req.params)
				.then( student => {
					res.status(200).json(student);
				}).catch( () => {
					res.sendStatus(404);
				});
		})
		.delete('/:idStudent', teacher_credentials, (req,res) => {
			const {idStudent} = req.params;
			studentCtrl.deleteOneStudent(idStudent)
				.then( response => {
					res.status(410).json(response);
				}).catch(() => {
					res.sendStatus(404);
				});
		})
		.put('/:idStudent/newClass',student_credentials, (req,res)=>{
			const {idStudent} = req.params;
			const {idClass} = req.body;
			studentCtrl.addNewClass(idStudent,idClass)
				.then( response => {
					res.status(410).json(response);
				}).catch(() => {
					res.sendStatus(404);
				});
		});
        
});

export default app;