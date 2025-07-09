const { request } = require("../utils/request");

// method, url, payload, headers, params
const login = async (payload) => {
    const endPoint = "/auth/login";

    try {
        const response = await request("post", endPoint, payload, null, null);

        return response.data;
    } catch (err) {
        return null;
    }

};


const register = async (payload) => {

    const endPoint = "/auth/register";

    try {
        const response = await request("post", endPoint, payload,
           null , null);

        const { data } = response;
        return data;
    } catch (err) {
        return null;
    }
};


module.exports = { login, register };



