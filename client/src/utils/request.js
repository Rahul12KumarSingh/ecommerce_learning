import axios from "axios";

const axiosInstance = axios.create({});


export const request = async (method, endpoint , payload , headers, params) => 
  {
    const url = "https://ecommerce-learning-1.onrender.com/api" + endpoint ;

    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: payload ? payload : null,
        headers: headers ? headers : null,
        params: params ? params : null
    }) ;
 };




