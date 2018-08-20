import express from 'express';
import Student from './student';
import Teacher from './teacher';

const API_PUBLIC= '/api/v1/public';

let router = express.Router();

router.use(API_PUBLIC,Student);
router.use(API_PUBLIC,Teacher);

router.get(API_PUBLIC, (req, res) =>{
	res.send('API for private user');
});

export default router;