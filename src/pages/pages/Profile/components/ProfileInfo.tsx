import { Button, CardBody, Col, Modal, Row } from 'react-bootstrap'
import defaultProfile from '/default-image/defaultprofile.png'
import { CustomIdentityRoleDto } from '@/types/ApplicationTypes/IdentityType'
import { useEffect, useState } from 'react'
import { FilePond } from 'react-filepond'
import { HttpClient, HttpClientAuth } from '@/common'
import { UserProfileDto } from '@/types/ApplicationTypes/UserProfileType'
import { AxiosResponse } from 'axios'
import { FiCheck } from 'react-icons/fi'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const ProfileInfo = (props: { userId: number, roles: CustomIdentityRoleDto[], verified: boolean }) => {
	const [user, setUser] = useState<UserProfileDto>();
	const [imgUrl, setImgURL] = useState(defaultProfile)
	const [show, setShow] = useState(false);
	const [loading, _setLoading] = useState(false)
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		FetchUserProfile()
	}, [])

	const FetchUserProfile = async () => {
		try {
			const res: AxiosResponse<UserProfileDto> =
				await HttpClientAuth.get('/api/ManageUser/' + props.userId)
			if (res?.data) {
				setUser(res?.data)
				if (res?.data.ProfileBlobUrl) {
					var img = new Image()
					img.src = res?.data.ProfileBlobUrl
					if (img.height != 0) setImgURL(res?.data.ProfileBlobUrl)
				}
			}
		} catch (e: any) {
			console.log(e)
		}
	}

	const UploadImg = () => {
		const [upload, setUpload] = useState<File>()
		const [newImgURL, setNewImgUrl] = useState("")
		const [loading, setLoading] = useState(false)
		const [error, setError] = useState("")
		const reader = new FileReader()
		reader.onload = (e) => {
			const res = e.target?.result?.toString()
			if (res) setNewImgUrl(res)
		}
		useEffect(() => {
			if (upload != undefined) {
				reader.readAsDataURL(upload)
			}
		}, [upload])

		const UploadImage = async () => {
			setLoading(true)
			if (upload != undefined) {
				try {
					const data = new FormData();
					data.append('imageFile', upload);
					const res: AxiosResponse = await
						HttpClientAuth.put('/api/ManageUser/profile-image/' + props.userId, data, {
							headers: {
								'accept': '*/*',
								'Content-Type': 'multipart/form-data',
							},
						})
					if (res?.status == 200) {
						toast.info("Profile updated", { position: "bottom-right", duration: 2000 })
						FetchUserProfile()
						handleClose();
					}
					console.log(res)
				} catch (e: any) {
					console.log(e)
					setError("Something went wrong")
				}
			}
			else setError("You haven't upload any")
			setLoading(false)
		}

		return (<>
			<Modal show={show} onHide={handleClose} backdrop='static'>
				<Modal.Header closeButton>
					<Modal.Title>Upload Profile Image</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Row>
							<Col xs={2}>
								<div className="user-profile-main-pic">
									<img
										src={newImgURL != "" ? newImgURL : imgUrl}
										alt=""
										width={90}
										height={90}
										className="rounded-circle"
									/>
								</div>
							</Col>
						</Row>
						<Row>
							<p className='ms-1 mt-5'>Upload new Profile Image</p>
							<FilePond
								allowMultiple={false}
								allowReorder={true}
								allowDrop
								acceptedFileTypes={["image/png", "image/jpeg"]}
								maxFiles={1}
								onupdatefiles={(files) => {
									let getFile = files[0];
									let addedFile = new File([getFile.file], getFile.file.name, {
										type: getFile.file.type,
										lastModified: getFile.file.lastModified,
									});
									setUpload(addedFile);
								}}
							/>
						</Row>
						{error != "" ? <div className='text-danger fw-bold fs-3'>{error}</div> : <></>}
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button disabled={loading} variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button disabled={loading} variant="primary" onClick={() => { UploadImage(); }}>Upload</Button>
				</Modal.Footer>
			</Modal>
		</>)
	}


	return (
		<div>
			{!loading ?
				<>
					<Row>
						<Col xs={12} className='m-0'>
							<CardBody>
								<div className="user-profile">
									<Row>
										<Col lg={4} className="align-self-center mb-3 mb-lg-0">
											<div className="user-profile-main">
												<div className="user-profile-main-pic">
													<img
														src={imgUrl}
														alt=""
														width={110}
														height={110}
														className="rounded-circle"
													/>
													<span className="user-profile_main-pic-change" onClick={handleShow}>
														<i className="fas fa-camera"></i>
													</span>
												</div>
												<div className="user-profile_user-detail">
													<h5 className="user-user-name text-capitalize text-warning">{user?.Fullname ?? "User#"+user?.Id}{props.verified ? <FiCheck /> : <Link to="/auth/confirm-email" className='mx-3 verify'>verify email now</Link>}</h5>
													<p className="mb-0 user-user-name-post text-white">
														{props.roles.map(p => p.Name).join("-")}
													</p>
												</div>
											</div>
										</Col>

										<Col lg={4} className="ms-auto align-self-center">
											<ul className="list-unstyled personal-detail mb-0">
												<li className="">
													<i className="ti ti-mobile me-2 text-warning font-16 align-middle"></i>{' '}
													<b className='text-warning'> phone: {undefined ?? "Not Updated"} </b>
												</li>
												<li className="mt-2">
													<i className="ti ti-email text-warning font-16 align-middle me-2"></i>{' '}
													<b className='text-warning'> Email : {undefined ?? "Not Updated"}</b>
												</li>
											</ul>
										</Col>

										<Col lg={4} className="align-self-center">
											<Row className='social d-flex justify-content-start'>
												{user?.Facebook ?
													<Col className="col-auto me-2 p-1 text-center">
														<a href={user?.Facebook} target='_blank'>
															<i className="fab fa-facebook-f text-warning" />
															<p className="mb-0 fw-semibold text-warning">Facebook</p>
														</a></Col> : <></>}

												{user?.Instagram ?
													<Col className="col-auto me-2 p-1 text-center">
														<a href={user?.Instagram} target='_blank'>
															<i className="fab fa-instagram text-warning">
															</i>
															<p className="mb-0 fw-semibold text-warning">Instagram</p>
														</a></Col> : <></>}



												{user?.Youtube ?
													<Col className="col-auto me-2 p-1 text-center">
														<a href={user?.Youtube} target='_blank'>
															<i className="fab fa-youtube text-warning">
															</i>
															<p className="mb-0 fw-semibold text-warning">Youtube</p>
														</a></Col> : <></>}


												{user?.SoundCloud ?
													<Col className="col-auto me-2 p-1 text-center">
														<a href={user?.SoundCloud} target='_blank'>
															<i className="fab fa-soundcloud text-warning">
															</i>
															<p className="mb-0 fw-semibold text-warning">SoundCloud</p>
														</a>
													</Col> : <></>}

											</Row>
										</Col>
									</Row>
								</div>
							</CardBody>
						</Col>
					</Row>
					<UploadImg />
				</> : <></>
			}
		</div >
	)
}

export default ProfileInfo
