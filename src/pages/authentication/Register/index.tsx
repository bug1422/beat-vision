import {
	Button,
	Card,
	CardBody,
	Col,
	Form,
	Image,
	Nav,
	NavItem,
	NavLink,
	Row,
	TabContainer,
	TabContent,
	TabPane,
} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import logo from '/logo-sm-2.png'
import { PageMetaData } from '@/components'
import AuthLayout from '../AuthLayout'
import useRegister from './RegisterForm'
import { FiChrome, FiFacebook } from 'react-icons/fi'

const Register = () => {
	const {RegisterForm, isAuthenticated, redirectUrl} = useRegister()
	return (
		<AuthLayout>
			<PageMetaData title="Register" />
			{isAuthenticated && <Navigate to={redirectUrl} replace />}
			<Card className='pb-3'>
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
						<p className="text-muted  mb-0">Sign in to continue to Beat Vision.</p>
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
							<Button variant="outline-secondary" size="sm">
								<FiFacebook/> Facebook
							</Button>
							<Button variant="outline-secondary" size="sm">
								<FiChrome/> Google
							</Button>
						</div>
					</TabContainer>
				</CardBody>
			</Card>
		</AuthLayout>
	)
}

export default Register
