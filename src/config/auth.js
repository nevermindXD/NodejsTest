import jwt from 'jsonwebtoken';
import config from './db';

export const authorization = (req, res, next) => {
	if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
		jwt.verify(req.headers.authorization.split(' ')[1], config.secretKey, (err, decode) => {
			if (err)
				req.user = undefined;
			else
				req.user = decode.user;
			next();
		});
	}
	else {
		req.user = undefined;
		next();
	}
};


export const teacher_credentials = (req, res, next) => {

	const  { user } = req;
	if (user) {
		if (user.Position === 'Teacher') {
			next();
		}
		else {
			res.status(400).json({ message: 'Invalid credentials' });
		}
	}
	else
		res.status(400).json({ message: 'Unauthorized user' });
};

export const student_credentials = (req, res, next) => {

	const  { user } = req;
	if (user) {
		if (user.Position === 'Student') {
			next();
		}
		else {
			res.status(400).json({ message: 'Invalid credentials' });
		}
	}
	else
		res.status(400).json({ message: 'Unauthorized user' });
};