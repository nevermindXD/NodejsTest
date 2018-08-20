import { Student } from '../models';
import { ClassI } from '../models';
import { generateJWT, hashSyncData, compareHashSyncData } from '../utils/utilities';


const getAllStudent = () => {
	return Student.find()
		.then( students => {
			return students;
		})
		.catch( e => {
			return e;
		});
};

const getOneStudent = (id) => {
	return Student.findById(id).populate('ClassI')
		.then( student => {
			return student;
		}).catch( e => {
			return e;
		});
};

const addOneStudent = (student) => {
	let newStudent = new Student(student);
	newStudent.Password = hashSyncData(newStudent.Password,10);
	return newStudent.save()
		.then( () => {
			return 'Added successfully';
		})
		.catch( e => {
			return e;
		});
};


const deleteOneStudent = (id) => {
	return Student.findByIdAndRemove(id)
		.then( () => {
			return 'Removed successfully';
		})
		.catch( e => {
			return e;
		});
};

const updateOneStudent = (id, newInfo) => {
	let byId = { _id: id };
	let query = { $set: newInfo };
	return Student.update(byId, query)
		.then(student => {
			return student;
		})
		.catch(e => {
			return e;
		});
};

const logInStudent = ( Mail, Password) => {
	let message;
	let query = { Mail };
	return Student.findOne(query)
		.then(student => {
			if (student == null) {
				message = 'Student not found';
				return message;
			}
			else if (student) {
				if (!compareHashSyncData(Password, student.Password)) {
					message = 'Wrong password';
					return message;
				}else{
					
					let studentInfo = {
						_id: student.id,
						Position: 'Student'
					};
					let token = generateJWT({user: studentInfo });
					let response = {
						message: 'Cool take this :)',
						token: token
					};
					return response;
				}
			}
		});
};


const addNewClass = (idStudent,idClass) =>{

	return ClassI.findById(idClass)
		.then(classI => {
			return Student.findById(idStudent)
				.then(student => {
					classI.Student.push(idStudent);
					classI.save(err=>{
						if(err){
							return err;
						}
					});
					student.ClassI.push(idClass);
					student.save(err=>{
						if(err){
							return err;
						}
					});
					return student;
				}).catch(e=>{
					return e;
				});
		}).catch(e=>{
			return e;
		});

};


export {
	getAllStudent,
	getOneStudent,
	addOneStudent,
	deleteOneStudent,
	updateOneStudent,
	logInStudent,
	addNewClass
};