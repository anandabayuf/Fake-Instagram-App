const schema = require('./schema');

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		new schema.ImageSchema(data).save((err, response) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	});
};

exports.getAll = () => {
	return new Promise((resolve, reject) => {
		schema.ImageSchema.find({}, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};
