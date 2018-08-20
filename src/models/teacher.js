import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TeacherSchema = new Schema ({
	Name:{
		type: String,
		required:true
	},
	Lastname:{
		type:String,
		required:true
	},
	ClassI:[{
		type: Schema.Types.ObjectId,
		ref: 'ClassI'
	}],
	Picture:{
		type:String
	},
	Password:{
		type: String,
		required: true
	},
	Mail:{
		type: String,
		unique: true
	},
	CreationDate: {
		type: Date,
		default: Date.now()
	}
},{
	versionKey: false
});

export default mongoose.model('Teacher', TeacherSchema);