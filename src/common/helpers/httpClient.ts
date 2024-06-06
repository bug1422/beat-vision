import axios from 'axios'

function HttpClient(){
	return {
		get: axios.get,
		post: axios.post,
		put: axios.put,
		delete: axios.delete,
	}
}
export default HttpClient()
