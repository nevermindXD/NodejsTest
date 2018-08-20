import express from 'express';
import { authorization } from '../../config/auth';
import Teacher from './teacher';
import Student from './student';
import ClassI from './classI';


const API_PRIVATE= '/api/v1/private';

let router = express.Router();


router.use(authorization);
router.use(API_PRIVATE,Teacher);
router.use(API_PRIVATE,Student);
router.use(API_PRIVATE,ClassI);


router.get(API_PRIVATE, (req, res) =>{
	res.send('API for private user');
});

export default router;