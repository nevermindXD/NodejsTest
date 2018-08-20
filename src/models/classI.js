import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClassISchema = new Schema ({
	Name:{
		type: String,
		required:true
	},
	Student:[{
		type:Schema.Types.ObjectId,
		ref:'Student'
	}],
	Teacher: {
		type:Schema.Types.ObjectId,
		ref:'Teacher'
	},
	CreationDate: {
		type: Date,
		default: Date.now()
	}
    
},{
	versionKey: false
});

export default mongoose.model('ClassI', ClassISchema);