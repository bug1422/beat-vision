import axios, { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next';


function HttpClientAuth() {
	const token = getCookie("BEATVISION");
	
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
		get: async (url: string, options: any = {}): Promise<AxiosResponse<any, any>> => await instance.get(url, { headers: { ...defaultOptions.headers, ...options.headers } }),
		post: async (url: string, data: any, options: any = {}): Promise<AxiosResponse<any, any>> => await instance.post(url, data, { headers: { ...defaultOptions.headers, ...options.headers } }),
		put: async (url: string, data: any, options: any = {}): Promise<AxiosResponse<any, any>> => await instance.put(url, data, { headers: { ...defaultOptions.headers, ...options.headers } }),
		delete: async (url: string, options: any = {}): Promise<AxiosResponse<any, any>> => await instance.delete(url, { headers: { ...defaultOptions.headers, ...options.headers } }),
	}
}
export default HttpClientAuth()

