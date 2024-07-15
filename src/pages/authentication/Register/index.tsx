import {
	Card,
	CardBody,
	Image,
	Nav,
	NavItem,
	TabContainer,
} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import logo from '/logo-sm-2.png'
import { PageMetaData } from '@/components'
import useRegister from './RegisterForm'
import { FiChrome } from 'react-icons/fi'
import { Preloader } from '@/components'
import { Suspense } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
const Register = () => {
	const { RegisterForm, isAuthenticated, redirectUrl } = useRegister()

	
	return (
		<>
			<PageMetaData title="Register" />
			<div className="account-body metal-bg" >
				<Container >
					<Row className="d-flex justify-content-center">
						<Col xs={12} className="align-self-center">
							<Row className="row  mt-5">
								<Col lg={5} className="mx-auto regi-component">
									<Suspense fallback={<Preloader />}>
										{isAuthenticated && <Navigate to={redirectUrl} replace />}
										<Card className='pb-3 regi-card'>
											<CardBody className="p-0 auth-header-box">
												<div className="text-center p-3">
													<Link to="/" className="logo logo-admin">
														<Image
															src={logo}
															height="50"
															alt="logo"
															className="auth-logo"
														/>
													</Link>
													<h4 className="mt-3 mb-1 fw-semibold text-white font-18">
														Let's Get Started
													</h4>
													<p className="text-white mb-0">Sign in to continue to Beat Vision.</p>
												</div>
											</CardBody>
											<CardBody className="p-0 px-2">
												<TabContainer defaultActiveKey="2">
													<Nav className="nav-border nav-pills" role="tablist">
														<NavItem>
															<Link to="/auth/login" className='nav-link'>Log In</Link>
														</NavItem>
														<NavItem>
															<div className='nav-link active'>Register</div>
														</NavItem>
													</Nav>
													<RegisterForm />
													<div className="mt-4 account-social">
														<h6 className="mb-3">Or Login With</h6>
													</div>
													<div className="btn-group w-100">
														<a href='https://api.beatvision.store/api/ManageIdentity/external-login?providerSchemeName=Google' className="btn btn-outline-secondary">
															<FiChrome /> Google
														</a>
													</div>
												</TabContainer>
											</CardBody>
										</Card>
									</Suspense>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	)
}

export default Register
