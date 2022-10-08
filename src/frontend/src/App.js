import { useEffect, useState } from 'react';
import { createImage, getAllImages } from './api/Image';
import MessageToast from './Message-Toast';

function App() {
	const [pictures, setPictures] = useState([]);
	const [picture, setPicture] = useState({
		file: '',
	});

	const [isFetching, setIsFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [toastState, setToastState] = useState({
		show: false,
		title: '',
		message: '',
	});

	const getImages = async () => {
		setIsFetching(true);
		const response = await getAllImages();
		const data = await response.data;
		setTimeout(() => {
			setIsFetching(false);
			setPictures(data);
		}, 1000);
	};

	useEffect(() => {
		getImages();
	}, []);

	const handleChange = (e) => {
		console.log(e.target.files[0]);
		setPicture({
			file: e.target.files[0],
		});
	};

	const saveImage = async () => {
		setIsLoading(true);
		const response = await createImage(picture.file);

		setTimeout(() => {
			setIsLoading(false);
			setPicture({
				file: '',
			});
			if (response.status.includes('201')) {
				getImages();

				setToastState({
					show: true,
					title: 'Success',
					message: response.message,
				});
			} else {
				setToastState({
					show: true,
					title: 'ERROR',
					message: response.message,
				});
			}

			setTimeout(() => {
				setToastState({
					show: false,
					title: '',
					message: '',
				});
			}, 5000);
		}, 1000);
	};

	return (
		<div
			className="min-vh-100"
			style={{
				paddingTop: '20px',
				paddingBottom: '20px',
				paddingLeft: '230px',
				paddingRight: '230px',
			}}
		>
			<div className="container">
				<h3>Fake Instagram</h3>
				<div className="mt-5 row justify-content-center align-items-center">
					<div className="col-4 justify-self-center">
						<img
							src="https://picsum.photos/150?random=1"
							className="img-fluid"
							style={{ borderRadius: '100px' }}
							alt=""
						/>
					</div>
					<div className="col-8">
						<div className="row">
							<div className="col-auto">
								<p
									className="lead"
									style={{ fontSize: '32px' }}
								>
									johndoe
								</p>
							</div>
						</div>
						<div className="mt-2 row justify-content-start align-items-center">
							<div className="col-auto">
								<span>
									<strong>10</strong> Posts
								</span>
							</div>
							<div className="col-auto">
								<span>
									<strong>10.7K</strong> Followers
								</span>
							</div>
							<div className="col-auto">
								<span>
									<strong>145</strong> Following
								</span>
							</div>
						</div>
						<div className="mt-3 row">
							<div className="col-auto">
								<p>
									<strong>John Doe</strong>
								</p>
							</div>
						</div>
						<div className="mt-3 row">
							{isLoading ? (
								<div className="text-center">
									<div
										className="spinner-border"
										role="status"
									>
										<span className="visually-hidden">
											Loading...
										</span>
									</div>
								</div>
							) : (
								<>
									<div className="col-8">
										<div className="d-grid gap-2">
											<input
												className="form-control"
												type="file"
												id="formFile"
												onChange={handleChange}
											/>
										</div>
									</div>
									<div className="col-4">
										<div className="d-grid gap-2">
											<button
												className="btn btn-outline-dark"
												onClick={() => saveImage()}
												disabled={!picture.file}
											>
												Upload Image
											</button>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
				<div className="mt-5 mb-4 row gx-5 ">
					<div className="col-auto">
						<img
							src="https://picsum.photos/75?random=2"
							className="img-fluid img-thumbnail"
							style={{ borderRadius: '100px' }}
							alt=""
						/>
						<p
							className="mt-2 text-center"
							style={{ fontSize: '12px' }}
						>
							Places
						</p>
					</div>
					<div className="col-auto">
						<img
							src="https://picsum.photos/75?random=3"
							className="img-fluid img-thumbnail"
							style={{ borderRadius: '100px' }}
							alt=""
						/>
						<p
							className="mt-2 text-center"
							style={{ fontSize: '12px' }}
						>
							Foods
						</p>
					</div>
				</div>
				<hr />
				{isFetching ? (
					<div className="text-center">
						<div
							className="spinner-border"
							role="status"
						>
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : (
					<div className="row gx-3 gy-3 justify-content-center">
						{pictures.length !== 0 ? (
							pictures.map((img, index) => {
								const base64String = btoa(
									new Uint8Array(img.img.data.data).reduce(
										function (data, byte) {
											return (
												data + String.fromCharCode(byte)
											);
										},
										''
									)
								);

								return (
									<div
										className="col-auto"
										key={index}
									>
										<img
											src={`data:image/png;base64,${base64String}`}
											width={300}
											height={300}
											alt=""
										/>
									</div>
								);
							})
						) : (
							<div className="h3 text-center">NO DATA</div>
						)}
					</div>
				)}
			</div>
			<MessageToast
				toastState={toastState}
				setToastState={setToastState}
			/>
		</div>
	);
}

export default App;
