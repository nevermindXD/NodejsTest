import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const StudentSchema = new Schema ({
	Name:{
		type: String,
		required:true
	},
	Lastname:{
		type:String,
		required:true
	},
	Age:{
		type: Number
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

export default mongoose.model('Student', StudentSchema);