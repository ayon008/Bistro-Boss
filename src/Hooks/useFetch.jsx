import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response.data);
                setData(response.data)
            })
    }, [url])
    console.log(data);
    return { data };
};

export default useFetch;