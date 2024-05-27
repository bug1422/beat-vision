import { HttpClient } from '@/common'
import { useAuthContext } from '@/context'
import { yupResolver } from '@hookform/resolvers/yup'
import { type AxiosResponse } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from 'yup'
import { jwtDecode } from 'jwt-decode'
import type { User } from '@/types'
import { AuthReturnType, UserDecoded } from '@/types/AuthTypes'


export default function useLogin() {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const { isAuthenticated, saveSession } = useAuthContext()

	const schemaResolver = yup.object().shape({
		email: yup
			.string()
			.email('Please enter a valid email')
			.required('Please enter Email'),
		password: yup.string().required('Please enter Password'),
	})

	const { control, handleSubmit } = useForm({
		resolver: yupResolver(schemaResolver),
		// defaultValues: {
		// 	email: 'admin@mannatthemes.com',
		// 	password: 'password',
		// },
	})

	type LoginFormFields = yup.InferType<typeof schemaResolver>

	// const redirectUrl = useMemo(() => (location.state?.from.pathname, location.pathname ?? "/"), [location.state]);
	const redirectUrl = searchParams.get('next') ?? '/'

	const login = handleSubmit(async function (values: LoginFormFields) {
		setLoading(true)
		try {
			const res: AxiosResponse<AuthReturnType> = await HttpClient.post('/api/ManageIdentity/login', values)
			if (res.data?.accessToken) {
				const decoded = jwtDecode<UserDecoded>(res.data?.accessToken);
				let user: User = {
					id: parseInt(decoded.userid),
					email: decoded.email,
					role: decoded.role,
					exp: decoded.exp,
					accessToken: res.data?.accessToken,
					refreshToken: res.data?.refreshToken,
				};

				saveSession({
					...(user ?? {}),
				})
				toast.success('Successfully logged in. Redirecting....', {
					position: 'bottom-right',
					duration: 2000,
				})
				navigate(redirectUrl)
			}
		} catch (e: any) {

			console.log(e)
			if (e.response?.status == 400) {
				const mess = "Wrong email or password!"
				toast.error(mess, {
					position: 'bottom-right',
					duration: 2000,
				})
			}
		} finally {
			setLoading(false)
		}
	})

	return { loading, login, redirectUrl, isAuthenticated, control }
}
