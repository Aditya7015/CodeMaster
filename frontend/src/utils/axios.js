import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://codemaster-sfk0.onrender.com',
    // baseURL:"http://localhost:17216",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;