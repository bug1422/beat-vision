import axios from 'axios'

function HttpClient(){
	const baseURL = import.meta.env.VITE_API_URL;
	const instance = axios.create({
		baseURL,
	})
	return {
		get: instance.get,
		post: instance.post,
		put: instance.put,
		delete: instance.delete,
	}
}
export default HttpClient()
