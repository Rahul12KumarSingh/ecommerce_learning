import axios from "axios";

const axiosInstance = axios.create({});


export const request = async (method, endpoint , payload , headers, params) => 
  {
    const url = "http://localhost:5000/api" + endpoint ;

    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: payload ? payload : null,
        headers: headers ? headers : null,
        params: params ? params : null
    }) ;
 };




