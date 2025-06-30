import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" }
});

// Function to set auth token
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
    } else {
        delete api.defaults.headers["Authorization"];
        localStorage.removeItem("token");
    }
};
