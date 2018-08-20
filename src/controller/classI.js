import { ClassI } from '../models';


const getAllClasses = () => {
	return ClassI.find().populate('Teacher').populate('Student')
		.then( classes => {
			return classes;
		})
		.catch( e => {
			return e;
		});
};

const getOneClass = (id) => {
	return ClassI.findById(id)
		.then( classI => {
			return classI;
		}).catch( e => {
			return e;
		});
};

const addOneClass = (classI, idTeacher) => {
	let newClassI = new ClassI(classI);
	newClassI.Teacher = idTeacher;
	return newClassI.save()
		.then( () => {
			return 'Added successfully';
		})
		.catch( e => {
			return e;
		});
};


const deleteOneClass = (id) => {
	return ClassI.findByIdAndRemove(id)
		.then( () => {
			return 'Removed successfully';
		})
		.catch( e => {
			return e;
		});
};

const updateOneClass = (id, newInfo) => {
	let byId = { _id: id };
	let query = { $set: newInfo };
	return ClassI.update(byId, query)
		.then(classI => {
			return classI;
		})
		.catch(e => {
			return e;
		});
};


export {
	getAllClasses,
	getOneClass,
	addOneClass,
	deleteOneClass,
	updateOneClass,
};