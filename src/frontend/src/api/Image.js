import { BASE_URL } from './Helper';

const getAllImages = async () => {
	try {
		const response = await fetch(BASE_URL);
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

const createImage = async (image) => {
	try {
		const formData = new FormData();
		formData.append('image', image);
		const response = await fetch(BASE_URL, {
			method: 'POST',
			body: formData,
		});
		const responseJson = await response.json();

		return responseJson;
	} catch (err) {
		alert(err);
	}
};

export { getAllImages, createImage };
