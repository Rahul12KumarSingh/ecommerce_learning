const { request } = require("../utils/request");

const getAllProduct = async (payload) => {
    const headers = {
        "Authorization": "Bearer " + localStorage.getItem("token"),
    };

    const endPoint = "/products";

    try {
        const response = await request("get", endPoint, payload, headers, null);

        return response.data;
    } catch (err) {
        return null;
    }
};



const addToCartApi = async () => {
    const headers = {
        "Autherization": "Bearer " + localStorage.getItem("token"),
    };


};

const removeFromCartApi = async () => {
    const headers = {
        "Autherization": "Bearer " + localStorage.getItem("token"),
    };


};


module.exports = {
    getAllProduct,
    addToCartApi,
    removeFromCartApi
}
