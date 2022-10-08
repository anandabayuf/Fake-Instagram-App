const { config } = require('dotenv');
const mongoose = require('mongoose');

config();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('MongoDB connection has been established successfully.');
	})
	.catch((error) => {
		console.log('Unable to connect to MongoDB: ', error);
	});

exports.ImageSchema = mongoose.model('Image', {
	img: {
		data: Buffer,
		contentType: String,
	},
});
