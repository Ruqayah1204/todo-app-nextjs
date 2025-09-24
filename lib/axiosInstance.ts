import axios from "axios"

const createAxiosInstance = axios.create({
    baseURL: "https://api.oluwasetemi.dev/",
    // baseURL: "https://dummyjson.com",
    headers: { 'Content-Type': 'application/json' },
})

export default createAxiosInstance;  
