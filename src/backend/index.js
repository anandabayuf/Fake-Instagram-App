const { config } = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const ImageModel = require('./models/image');

// const controllers = require('./controllers');

config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

app.get('/image', async (req, res) => {
	try {
		res.status(200).json({
			message: 'Successfully get all images data',
			status: '200 OK',
			data: await ImageModel.getAll(),
		});
	} catch (err) {
		res.status(404).json({
			message: 'Error to get all images data',
			status: '404 NOT FOUND',
			err,
		});
	}
});

app.post('/image', upload.single('image'), async (req, res) => {
	const payload = {
		img: {
			data: fs.readFileSync(
				path.join(__dirname + '/uploads/' + req.file.filename)
			),
			contentType: 'image/png',
		},
	};

	try {
		res.status(201).json({
			message: 'Successfully create image data',
			status: '201 OK',
			data: await ImageModel.create(payload),
		});
	} catch (err) {
		res.status(404).json({
			message: 'Error to create image data',
			status: '404 NOT FOUND',
			err,
		});
	}
});

app.listen(process.env.PORT, () => {
	console.log(
		`Fake Instagram App API listening on http://localhost:${process.env.PORT}`
	);
});
