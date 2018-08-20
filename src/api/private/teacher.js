import express from 'express';
import * as teacherCtrl from '../../controller/teacher';
import * as studentCtrl from '../../controller/student';
import {teacher_credentials} from '../../config/auth';


const app = express.Router();
app.group('/teachers', (router) => {
	router
		.get('/', teacher_credentials, (req,res) => {
			teacherCtrl.getAllTeachers()
				.then( teachers => {
					res.status(200).json(teachers);
				}).catch( () => {
					res.sendStatus(404);
				});
		})
		.get('/:idTeacher', teacher_credentials, (req,res) => {
			const {idTeacher} = req.params;

			teacherCtrl.getOneTeacher(idTeacher)
				.then( teacher => {
					res.status(200).json(teacher);
				}).catch( () => {
					res.sendStatus(404);
				});
		})
		.put('/:idTeacher', teacher_credentials, (req,res) => {
			const {idTeacher} = req.params;

			teacherCtrl.updateOneTeacher(idTeacher,req.params)
				.then( teacher => {
					res.status(200).json(teacher);
				}).catch( () => {
					res.sendStatus(404);
				});
		})
		.delete('/:idTeacher', teacher_credentials, (req,res) => {
			const {idTeacher} = req.params;
			teacherCtrl.deleteOneTeacher(idTeacher)
				.then( response => {
					res.status(410).json(response);
				}).catch(() => {
					res.sendStatus(404);
				});
		})
		.get('/students', teacher_credentials, (req,res) => {
			studentCtrl.getAllStudent()
				.then( students => {
					res.status(200).json(students);
				})
				.catch( () => {
					res.sendStatus(404);
				});
		});
});

export default app;