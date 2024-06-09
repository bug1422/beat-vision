import {
	Button,
	Card,
	CardBody,
	Col,
	Image,
	Nav,
	NavItem,
	Row,
	TabContainer,
	TabContent,
	TabPane,
} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import logo from '/logo-sm-2.png'
import { FormInputPassword, FormTextInput, PageMetaData } from '@/components'
import useLogin from './useLogin'
import AuthLayout from '../AuthLayout'
import { FiChrome, FiFacebook } from 'react-icons/fi'
import { useState } from 'react'

const Login = () => {
	const { loading, control, login, redirectUrl, isAuthenticated } = useLogin()
	const [hovered, setHovered]  = useState(false)
	return (
		<>
			<PageMetaData title="Login" />
			{isAuthenticated && <Navigate to={redirectUrl} replace />}
			<AuthLayout>
				<Card>
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
							<p className="text-muted  mb-0">
								Sign in to continue to Beat Vision.
							</p>
						</div>
					</CardBody>
					<CardBody className="p-0">
						<TabContainer defaultActiveKey="1">
							<Nav className="nav-border nav-pills" role="tablist">
								<NavItem>
									<div className='nav-link active'>Log In</div>
								</NavItem>
								<NavItem>
									<Link to="/auth/register" className='nav-link'>Register</Link>
								</NavItem>
							</Nav>
							<TabContent>
								<TabPane
									eventKey="1"
									className="p-3"
									id="LogIn_Tab"
									role="tabpanel"
								>
									<form className="form-horizontal auth-form" onSubmit={login}>
										<FormTextInput
											name="email"
											label="Email"
											containerClass="mb-2"
											control={control}
											placeholder="Enter email"
										/>
										<FormInputPassword
											name="password"
											label="Password"
											control={control}
											placeholder="Enter password"
										/>

										<Row className="form-group my-3">
											<Col sm={6} className="text-start">
												<Link
													to="/auth/recover-pw"
													className=" font-13"
													onMouseEnter={() => setHovered(true)}
													onMouseOut={() => setHovered(false)}
													style={{color: hovered ? "purple" : "grey"}}
												>
													<i className="dripicons-lock"></i> Forgot password?
												</Link>
											</Col>
										</Row>

										<div className="form-group mb-0 row">
											<Col xs={12}>
												<Button
													variant="primary"
													className="w-100 waves-effect waves-light"
													disabled={loading}
													type="submit"
												>
													Log In
													<i className="fas fa-sign-in-alt ms-1"></i>
												</Button>
											</Col>
										</div>
									</form>
									<div className="mt-4 account-social">
										<h6 className="mb-3">Or Login With</h6>
									</div>
									<div className="btn-group w-100">
										<Button variant="outline-secondary" size="sm">
											<FiFacebook /> Facebook
										</Button>
										<Button variant="outline-secondary" size="sm">
											<FiChrome /> Google
										</Button>
									</div>
								</TabPane>
							</TabContent>
						</TabContainer>
					</CardBody>
				</Card>
			</AuthLayout>
		</>
	)
}

export default Login
