import cloudinary from 'cloudinary';
import connect from 'connect-multiparty';
import { cloudinaryCredentials } from '../config/cloudinary';

cloudinary.config(cloudinaryCredentials);
const fileParser = connect();

let uploadImg = (req,res,next) => {
	const {Picture} = req.files;
	
	if(Picture!=undefined){ 
		cloudinary.uploader.upload(Picture.path, result => {
			if(result.url){
				req.picture = result.url;
				next();
			}
			else{
				res.status(400).json({ message: 'error' });
			}
		});  
	}else{
		next();
	}
};


module.exports = {cloudinary,fileParser,uploadImg};