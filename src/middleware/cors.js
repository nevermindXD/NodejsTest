export default function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, Authorization, X-Requested-With, Content-Type, Accept'
	);
	next();
}