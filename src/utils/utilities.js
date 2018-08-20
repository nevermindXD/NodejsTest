import Math from 'mathjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/db';

export function generateToken() {
	const token = Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2);
	return token;   
}


export function generateJWT(dataToEncryptObject, expiresIn = (60 * 60 * 4) ) {
	const { secretKey } = config;
	return jwt.sign(dataToEncryptObject, secretKey, { expiresIn });
}

export function hashSyncData(data, lenght = 10) {
	return bcrypt.hashSync(data, lenght);
} 

export function compareHashSyncData(dataOne, dataTwo) {
	return bcrypt.compareSync(dataOne, dataTwo);
}