import { Teacher } from '../models';
import { generateJWT, hashSyncData, compareHashSyncData } from '../utils/utilities';


const getAllTeachers = () => {
	return Teacher.find()
		.then( teachers => {
			return teachers;
		})
		.catch( e => {
			return e;
		});
};

const getOneTeacher = (id) => {
	return Teacher.findById(id).populate({
		path: 'ClassI',
		populate: {path: 'Students'}
	}).then( teacher => {
		return teacher;
	}).catch( e => {
		return e;
	});
};

const addOneTeacher = (teacher) => {
	let newTeacher = new Teacher(teacher);
	newTeacher.Password = hashSyncData(newTeacher.Password,10);
	return newTeacher.save()
		.then( () => {
			return 'Added successfully';
		})
		.catch( e => {
			return e;
		});
};


const deleteOneTeacher = (id) => {
	return Teacher.findByIdAndRemove(id)
		.then( () => {
			return 'Removed successfully';
		})
		.catch( e => {
			return e;
		});
};

const updateOneTeacher = (id, newInfo) => {
	let byId = { _id: id };
	let query = { $set: newInfo };
	return Teacher.update(byId, query)
		.then(teacher => {
			return teacher;
		})
		.catch(e => {
			return e;
		});
};

const logInTeacher = ( Mail, Password) => {
	let message;
	let query = { Mail };
	return Teacher.findOne(query)
		.then(teacher => {
			if (teacher == null) {
				message = 'Teacher not found';
				return message;
			}else if (teacher) {
				if (!compareHashSyncData(Password, teacher.Password)) {
					message = 'Wrong password';
					return message;
				}else{
					let teacherInfo = {
						_id: teacher.id,
						Position: 'Teacher'
					};
					let token = generateJWT({user: teacherInfo });
					let response = {
						message: 'Cool take this :)',
						token: token
					};
					return response;
				}
			}
		});
};

export {
	getAllTeachers,
	getOneTeacher,
	addOneTeacher,
	deleteOneTeacher,
	updateOneTeacher,
	logInTeacher
};