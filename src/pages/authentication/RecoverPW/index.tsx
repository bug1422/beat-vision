import { Button, Card, CardBody, CardFooter, Col, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoDark from '/logo-sm-dark.png'
import { FormTextInput, PageMetaData } from '@/components'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import AuthLayout from '../AuthLayout'
import httpClient from '@/common/helpers/httpClient'
import { useState } from 'react'

const RecoverPW = () => {
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState("")

	const schemaResolver = yup.object().shape({
		email: yup
			.string()
			.required('Please enter Email')
			.email('Please enter valid Email'),
	})

	const { control, handleSubmit } = useForm({
		resolver: yupResolver(schemaResolver),
	})
	type PasswordType = yup.InferType<typeof schemaResolver>

	const forget = handleSubmit(async function (value: PasswordType) {
		setLoading(true)
		try {
			const res = await httpClient.get("/api/ManageIdentity/forget-password", {
				params: {
					email: value.email
				}
			})
			if (res) {
				setSuccess(true)
			}
		}
		catch (e: any) {
			console.log(e)
			setError("Something went wrong")
		}
		setLoading(false)
	})

	return (
		<AuthLayout>
			<PageMetaData title="Recover PW" />
			{success ? <div className='text-center'>
				<div className='fs-1 fw-bold '>Please check your email</div>
				<div className='my-3'>We have sent a password reset to your mail </div>
				<Link to="/auth/login" className='border-bottom fw-lighter'>Click here to go back to Login</Link>
			</div> :
				<Card>
					<CardBody className="p-0 auth-header-box">
						<div className="text-center p-3">
							<Link to="/" className="logo logo-admin">
								<Image
									src={logoDark}
									height="50"
									alt="logo"
									className="auth-logo"
								/>
							</Link>
							<h4 className="mt-3 mb-1 fw-semibold text-white font-18">
								Reset Password For Dastone
							</h4>
							<p className="text-muted  mb-0">
								Enter your Email and instructions will be sent to you!
							</p>
						</div>
					</CardBody>
					<CardBody>
						<form
							className="form-horizontal auth-form"
							onSubmit={forget}
						>
							<FormTextInput
								name="email"
								label="Email"
								type="email"
								placeholder="Enter Email Address"
								containerClass="mb-3"
								control={control}
							/>

							<Row className="form-group mb-0">
								<Col xs={12} className="mt-2">
									<Button
										variant="primary"
										className="w-100 waves-effect waves-light"
										type="submit"
										disabled={loading}
									>
										Reset <i className="fas fa-sign-in-alt ms-1"></i>
									</Button>
								</Col>
							</Row>
						</form>

					</CardBody>
					<CardBody className="bg-light-alt text-center">
						<p className="text-muted mb-0 mt-3">
							Remember It ?{' '}
							<Link to="/auth/login" className="text-primary ms-2">
								Log in here
							</Link>
						</p>
					</CardBody>
					<CardFooter>
						{error != "" ? error : ""}
					</CardFooter>
				</Card>
			}
		</AuthLayout>
	)
}

export default RecoverPW
