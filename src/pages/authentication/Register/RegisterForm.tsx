import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { FormInputPassword, FormTextInput } from '@/components'
import { Button, Col, FormCheck, Row } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { HttpClient } from '@/common'
import { useAuthContext } from '@/context'
import { toast } from 'sonner'
import { jwtDecode } from 'jwt-decode'
import { User } from '@/types'
import { AuthReturnType } from '@/types/AuthTypes'
import { UserProfileDto } from '@/types/ApplicationTypes/UserProfileType'

export default function useRegister() {
	const { isAuthenticated, saveSession } = useAuthContext()
	const [searchParams] = useSearchParams()
	const redirectUrl = searchParams.get('next') ?? '/'
	const RegisterForm = () => {
		const [loading, setLoading] = useState(false)
		const navigate = useNavigate()

		const schemaResolver = yup.object().shape({
			username: yup.string().required('Please enter username'),
			email: yup
				.string()
				.required('Please enter Email')
				.email('Please enter valid Email'),
			password: yup.string().required('Please enter Password'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'Passwords must match'),
		})

		const { control, handleSubmit } = useForm({
			resolver: yupResolver(schemaResolver),
		})


		type RegisterFormFields = yup.InferType<typeof schemaResolver>

		const register = handleSubmit(async function (values: RegisterFormFields) {
			setLoading(true)
			try {
				const request = {
					"email": values.email,
					"password": values.password,
					"fullname": values.username
				}
				const res: AxiosResponse<AuthReturnType> = await HttpClient.post('/api/ManageIdentity/register', request)
				if (res.data) {
					var access = res.data.AccessToken
					var decoded = jwtDecode<User>(access)
					const res2: AxiosResponse<UserProfileDto> = await HttpClient.get('/api/ManageUser/identity/' + decoded.userid)
					decoded.profileId = res2.data.Id
					saveSession(access, decoded)
					toast.success('Successfully registered in. Redirecting....', {
						position: 'bottom-right',
						duration: 2000,
					})
					navigate(redirectUrl)
				}
			} catch (e: any) {
				console.log(e)
				let mess = 'Unknown error';
				if (e.response?.status == 400) {
					if (e.response?.data?.errorMessage == "user already exist") {
						mess = "Email already existed!"
					}
					else {
						mess = "Unexpected error happens!"
					}
				}
				if (e.response?.status == 500) {
					mess = "Internal error!"
				}
				toast.error(mess, {
					position: 'bottom-right',
					duration: 2000,
				})
			} finally {
				setLoading(false)
			}
		})

		return (
			<form
				className="form-horizontal auth-form"
				onSubmit={register}
			>
				<FormTextInput
					name="username"
					label="Username"
					containerClass="mb-2"
					control={control}
					placeholder="Enter username"
				/>
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
					containerClass="mb-2"
					placeholder="Enter password"
				/>
				<FormInputPassword
					name="confirmPassword"
					label="Confirm Password"
					control={control}
					containerClass="mb-2"
					placeholder="Enter confirm password"
				/>
				<Row className="form-group my-3">
					<Col sm={12}>
						<div className="custom-control custom-switch switch-success">

						</div>
					</Col>
				</Row>

				<Row className="form-group mb-0">
					<Col xs={12}>
						<Button
							variant="warning"
							type="submit"
							className="w-100 waves-effect waves-light text-white"
							disabled={loading}
						>
							Register <i className="fas fa-sign-in-alt ms-1"></i>
						</Button>
					</Col>
				</Row>
			</form>
		)
	}



	return { RegisterForm, isAuthenticated, redirectUrl }
}