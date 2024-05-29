import axios from 'axios';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'https://bistro-boss-server-three-liart.vercel.app/',
    })
    return axiosPublic;
};

export default useAxiosPublic;