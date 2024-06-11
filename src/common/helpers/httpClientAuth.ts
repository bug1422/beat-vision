import axios, { AxiosResponse } from 'axios'


function HttpClientAuth() {
	const token = localStorage.getItem("BeatVision")
	const defaultOptions = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const baseURL = import.meta.env.VITE_API_URL;
	const instance = axios.create({
		baseURL,
	})
	return {
		get: (url: string, options: any): Promise<AxiosResponse<any, any>> => instance.get(url, {  headers: { ...defaultOptions.headers, ...options.headers } }),
		post: (url: string, data: any, options: any): Promise<AxiosResponse<any, any>> => instance.post(url, data, {   headers: { ...defaultOptions.headers, ...options.headers }}),
		put: (url: string, data: any, options: any): Promise<AxiosResponse<any, any>> => instance.put(url, data, {  headers: { ...defaultOptions.headers, ...options.headers }}),
		delete: (url: string, options: any) => instance.delete(url, {  headers: { ...defaultOptions.headers, ...options.headers }}),
	}
}
export default HttpClientAuth()

