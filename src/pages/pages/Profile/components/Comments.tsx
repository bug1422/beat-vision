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
	const [isSuccess, setIsSuccess] = useState(false)
	const [trackComments, setTrackComments] = useState<TrackCommentDto[]>()
	const [likes, setLikes] = useState(0)
	useEffect(() => {
		const fetchComment = async () => {
			try {
				const res = await httpClient.get("/api/ManageUser/get-track-comment", {
					params: {
						userId: userData?.Id
					}
				})
				setIsSuccess(res?.data?.Value)
				if (isSuccess) {
					setTrackComments(res?.data?.Value)
					let sum = trackComments?.map(p => p.LikesCount)?.reduce((partialSum, a) => partialSum + a, 0) ?? 0
					setLikes(sum)
				}
			} catch (e: any) {
				setIsSuccess(true)
			}
			setIsLoading(false)
		}
		fetchComment()
	}, [])

	return (
		<>
			{isLoading ? <></> :
				<Row>
					<Col>
						<Card>
							<CardBody>
								<p className='fs-2 bold'>Comments</p>
								<Row>
									<Col lg={6}>
										<Card>
											<CardBody className="report-card">
												<Row className="d-flex justify-content-center">
													<Col>
														<p className="text-dark mb-1 fw-semibold">Comments</p>
														<h3 className="my-2 font-24 fw-bold">{trackComments?.length}</h3>
														<p className="mb-0 text-truncate text-muted">
															<i className="ti ti-thumb-up text-success font-18"></i>
															<span className="text-dark fw-semibold">{likes}</span>
															Likes
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
									<Col xl={12}>
										<Card>
											<CardBody className="border-bottom-dashed">
												{trackComments?.length == 0 ?
													<p className='text-dark mb-1 fw-semibold'>
														No comments made
													</p>
													: <ul className="list-unstyled mb-0">
														{trackComments?.map((comment, index) => (
															<li key={index}>
																<Row>
																	<Col>
																		<div className="comment-body ms-n2 bg-light-alt p-3">
																			<Row>
																				<Col>
																					<p className="text-dark fw-semibold mb-2">
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
																			<p>
																				{comment.Content}
																			</p>
																			<div className="text-primary">
																				<i className="fas fa-reply me-1"></i>
																				See Source
																			</div>
																		</div>
																	</Col>
																</Row>
															</li>
														))}
													</ul>
												}
											</CardBody>
										</Card>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			}
		</>
	)
}

export default Comments
