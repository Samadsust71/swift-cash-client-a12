import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";


const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useAuth();

    // intercepts the request and adds the token to the header 
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token')
        
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    // intercepts the response and checks for the status code
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await signOutUser();
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;