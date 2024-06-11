import { Card, CardBody, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '/logo-sm.png'
import error from '/error.svg'
import { PageMetaData } from '@/components'
import AuthLayout from '../AuthLayout'

const Error500 = () => {
	return (
		<AuthLayout>
			<PageMetaData title="Error 500" />
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
							Oops! Sorry page does not found
						</h4>
						<p className="text-white  mb-0">Back to Beat Vision Homepage.</p>
					</div>
				</CardBody>
				<CardBody>
					<div className="ex-page-content text-center">
						<Image src={error} alt="0" className="" height="170" />
						<h1 className="mt-5 mb-4">500!</h1>
						<h5 className="font-16 text-muted mb-5">You don't have permission to enter</h5>
					</div>
					<Link
						className="btn btn-warning text-white w-100 waves-effect waves-light"
						to="/"
					>
						Back to Home <i className="fas fa-redo ms-1"></i>
					</Link>
				</CardBody>
				<CardBody className="bg-light-alt text-center">
				</CardBody>
			</Card>
		</AuthLayout>
	)
}

export default Error500
