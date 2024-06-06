import axios, { AxiosResponse } from 'axios'


function HttpClientAuth(){
	const token = localStorage.getItem("BeatVision")
	console.log(token)
	const defaultOptions = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	console.log(token)
	return {
		get: (url: string, options = {}) : Promise<AxiosResponse<any, any>> => axios.get(url, { ...defaultOptions, ...options }),
		post: (url: string, data: any, options = {}) : Promise<AxiosResponse<any, any>> => axios.post(url, data, { ...defaultOptions, ...options }),
		put: (url: string, data: any, options = {}) : Promise<AxiosResponse<any, any>> => axios.put(url, data, { ...defaultOptions, ...options }),
		delete: (url: string, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
	}
}
export default HttpClientAuth()

