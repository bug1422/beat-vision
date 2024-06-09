import axios, { AxiosResponse } from 'axios'


function HttpClientAuth() {
	const token = localStorage.getItem("BeatVision")
	console.log(token)
	const defaultOptions = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	console.log(token)
	const baseURL = import.meta.env.VITE_API_URL;
	const instance = axios.create({
		baseURL,
	})
	return {
		get: (url: string, options = {}): Promise<AxiosResponse<any, any>> => instance.get(url, { ...defaultOptions, ...options }),
		post: (url: string, data: any, options = {}): Promise<AxiosResponse<any, any>> => instance.post(url, data, { ...defaultOptions, ...options }),
		put: (url: string, data: any, options = {}): Promise<AxiosResponse<any, any>> => instance.put(url, data, { ...defaultOptions, ...options }),
		delete: (url: string, options = {}) => instance.delete(url, { ...defaultOptions, ...options }),
	}
}
export default HttpClientAuth()

