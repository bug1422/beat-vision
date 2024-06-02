import { Button, Card, CardBody, Col, Modal, ModalHeader, Row } from 'react-bootstrap'
import user4 from '@/assets/images/users/user-4.jpg'
import { Link } from 'react-router-dom'
import { User } from '@/types'
import { FetchableImg } from '@/utils'
import { CustomIdentityUserDto } from '@/types/ApplicationTypes/IdentityType'
import { useEffect, useState } from 'react'
import { FilePond } from 'react-filepond'
import { HttpClient } from '@/common'
const ProfileInfo = (props: { user: CustomIdentityUserDto | undefined }) => {
	const { user } = props;
	const imgUrl = FetchableImg(user?.UserProfile?.ProfileBlobUrl)
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const UploadImg = () => {
		const [upload, setUpload] = useState<File>()
		const [imgUrl, setImgUrl] = useState("")
		const [loading, setLoading] = useState(false)
		const reader = new FileReader()
		reader.onload = (e) => {
			const res = e.target?.result?.toString()
			if (res) setImgUrl(res)
		}
		useEffect(() => {
			if (upload != undefined) {
				const url = reader.readAsDataURL(upload)
			}
		}, [upload])

		const onClickSubmit = async () => {
			try {
				const res = await HttpClient.put("/api/ManagerUser/get-track-commne")
				if(res?.data)
					console.log(res?.data)
			} catch (e: any) {
				console.log(e)
			}
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
										src={imgUrl}
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
								acceptedFileTypes={["image/png", "image/jpg"]}
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

					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button disabled={loading} variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button disabled={loading} variant="primary" onClick={onClickSubmit}>Upload</Button>
				</Modal.Footer>
			</Modal>
		</>)
	}

	return (
		<div>
			<Row>
				<Col xs={12}>
					<Card>
						<CardBody className="p-0">

						</CardBody>
						<CardBody>
							<div className="user-profile">
								<Row>
									<Col lg={4} className="align-self-center mb-3 mb-lg-0">
										<div className="user-profile-main">
											<div className="user-profile-main-pic">
												<img
													src={imgUrl}
													alt=""
													height="110"
													className="rounded-circle"
												/>
												<span className="user-profile_main-pic-change" onClick={handleShow}>
													<i className="fas fa-camera"></i>
												</span>
											</div>
											<div className="user-profile_user-detail">
												<h5 className="user-user-name text-capitalize">{user?.UserProfile?.Fullname}</h5>
												<p className="mb-0 user-user-name-post">
													{user?.Roles.map(p => p.Name).join("-")}
												</p>
											</div>
										</div>
									</Col>

									<Col lg={4} className="ms-auto align-self-center">
										<ul className="list-unstyled personal-detail mb-0">
											<li className="">
												<i className="ti ti-mobile me-2 text-secondary font-16 align-middle"></i>{' '}
												<b> phone </b> : {undefined ?? "Not Updated"}
											</li>
											<li className="mt-2">
												<i className="ti ti-email text-secondary font-16 align-middle me-2"></i>{' '}
												<b> Email </b> : {undefined ?? "Not Updated"}
											</li>
										</ul>
									</Col>

									<Col lg={4} className="align-self-center">
										<Row>
											<Col className="col-auto text-center">
												<Button
													variant="soft-info"
													className="btn-icon-circle btn-icon-circle-sm mb-2"
												>
													<i className="fab fa-facebook-f">{user?.UserProfile?.Facebook ?? <a href={user?.UserProfile?.Facebook ?? ""} target='_blank' />}
													</i>
												</Button>
												<p className="mb-0 fw-semibold">Facebook</p>
											</Col>

											<Col className="col-auto text-center">
												<Button
													variant="soft-info"
													className="btn-icon-circle btn-icon-circle-sm mb-2"
												>
													<i className="fab fa-instagram">
														{user?.UserProfile?.Instagram ?? <a href={user?.UserProfile?.Instagram ?? ""} target='_blank' />}
													</i>
												</Button>
												<p className="mb-0 fw-semibold">Instagram</p>
											</Col>

											<Col className="col-auto text-center">
												<Button
													variant="soft-info"
													className="btn-icon-circle btn-icon-circle-sm mb-2"
												>
													<i className="fab fa-youtube">
														{user?.UserProfile?.Youtube ?? <a href={user?.UserProfile?.Youtube ?? ""} target='_blank' />}
													</i>
												</Button>
												<p className="mb-0 fw-semibold">Youtube</p>
											</Col>

											<Col className="col-auto text-center">
												<Button
													variant="soft-info"
													className="btn-icon-circle btn-icon-circle-sm mb-2"
												>
													<i className="fab fa-soundcloud">{user?.UserProfile?.SoundCloud ?? <a href={user?.UserProfile?.SoundCloud ?? ""} target='_blank' />}
													</i>
												</Button>
												<p className="mb-0 fw-semibold">SoundCloud</p>
											</Col>
										</Row>
									</Col>
								</Row>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<UploadImg />
		</div>
	)
}

export default ProfileInfo
