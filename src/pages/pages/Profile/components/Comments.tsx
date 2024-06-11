import httpClient from '@/common/helpers/httpClient'
import { TrackCommentDto } from '@/types/ApplicationTypes/TrackCommentType'
import { UserProfileDto } from '@/types/ApplicationTypes/UserProfileType'
import { CompareDate } from '@/utils'
import { useEffect, useState } from 'react'
import { Row, Col, Card, CardBody } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Comments = (props: { userData: UserProfileDto | undefined | null }) => {
	const { userData } = props
	const [isLoading, setIsLoading] = useState(true)
	const [trackComments, setTrackComments] = useState<TrackCommentDto[]>()
	const [likes, setLikes] = useState(0)
	useEffect(() => {
		const fetchComment = async () => {
			try {
				const res = await httpClient.get("/api/ManageComment/get-user-track-comment", {
					params: {
						userId: userData?.Id
					}
				})
				if (res) {
					setTrackComments(res?.data)
					let sum = trackComments?.map(p => p.LikesCount)?.reduce((partialSum, a) => partialSum + a, 0) ?? 0
					setLikes(sum)
					console.log(res)
				}
			} catch (e: any) {
			}
			setIsLoading(false)
		}
		fetchComment()
	}, [])

	return (
		<>
			{isLoading ? <></> :
				<Row>
					<Col className='mx-4'>
						<p className='fs-2 bold text-white'>Comments</p>
						<Row>
							<Col lg={12} className="profile-comments">
								<Card className='profile-comments'>
									<CardBody className="report-card profile-comments">
										<Row className="d-flex justify-content-center">
											<Col>
												<p className="text-white mb-1 fw-semibold">Comments</p>
												<h3 className="my-2 font-24 fw-bold text-white">{trackComments?.length}</h3>
												<p className="mb-0 text-truncate text-muted">
													<i className="ti ti-thumb-up text-success font-18"></i>
													<span className="text-white fw-semibold ">{likes}</span>
													<span className="text-white fw-semibold"> Likes</span>
												</p>
											</Col>
											<div className="col-auto align-self-center">
												<div className="d-flex justify-content-center align-items-center thumb-xl bg-light-alt rounded-circle mx-auto">
													<i className="ti ti-brand-hipchat font-30 align-self-center text-muted"></i>
												</div>
											</div>
										</Row>
									</CardBody>
								</Card>
							</Col>
							<Col xl={12} className='profile-comments'>
									<div className="border-bottom-dashed">
										{trackComments?.length == 0 ?
											<p className='text-dark mb-1 fw-semibold'>
												No comments made
											</p>
											: <ul className="list-unstyled mb-0">
												{trackComments?.map((comment, index) => (
													<li key={index}>
														<Row>
															<Col>
																<div className="comment-body ms-n2  p-3">
																	<Row>
																		<Col>
																			<p className=" fw-bolder text-white fs-4 mb-2">
																				{userData?.Fullname}
																			</p>
																		</Col>
																		<div className="col-auto">
																			<span className="text-muted">
																				<i className="far fa-clock me-1"></i>
																				{CompareDate(Date.parse(comment.CreateDate), Date.now())}
																			</span>
																		</div>
																	</Row>
																	<p className='fw-bolder fs-4'>
																		{comment.Content}
																	</p>
																	<Link to={"/music-detail/detail/" + comment.TrackId} className="text-primary">
																		<i className="fas fa-reply me-1 text-warning">See Track</i>
																	</Link>
																</div>
															</Col>
														</Row>
													</li>
												))}
											</ul>
										}
									</div>
							</Col>
						</Row>
					</Col>
				</Row>
			}
		</>
	)
}

export default Comments
