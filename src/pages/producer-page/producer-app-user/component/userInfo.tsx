import { UserProfileDto } from "@/types/ApplicationTypes/UserProfileType"
import { Button, Card, CardBody, Col, Row } from "react-bootstrap"
import user4 from '@/assets/images/users/user-4.jpg'

const UserInfo = (props: { user: UserProfileDto }) => {
    const { user } = props
    console.log(user?.ProfileBlobUrl)
    const imgUrl = user?.ProfileBlobUrl ?? user4
    return (<Card>
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
                                <span className="user-profile_main-pic-change">
                                    <i className="fas fa-camera"></i>
                                </span>
                            </div>
                            <div className="user-profile_user-detail">
                                <h5 className="user-user-name text-capitalize">{user?.Fullname}</h5>
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
                                    <i className="fab fa-facebook-f">{user?.Facebook ?? <a href={user?.Facebook ?? ""} target='_blank' />}
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
                                        {user?.Instagram ?? <a href={user?.Instagram ?? ""} target='_blank' />}
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
                                        {user?.Youtube ?? <a href={user?.Youtube ?? ""} target='_blank' />}
                                    </i>
                                </Button>
                                <p className="mb-0 fw-semibold">Youtube</p>
                            </Col>

                            <Col className="col-auto text-center">
                                <Button
                                    variant="soft-info"
                                    className="btn-icon-circle btn-icon-circle-sm mb-2"
                                >
                                    <i className="fab fa-soundcloud">{user?.SoundCloud ?? <a href={user?.SoundCloud ?? ""} target='_blank' />}
                                    </i>
                                </Button>
                                <p className="mb-0 fw-semibold">SoundCloud</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </CardBody>
    </Card>)
}
export default UserInfo