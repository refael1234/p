import axios from "axios";


export function apiPost(route = "", body = {}) {
    return axios.post("http://localhost:5000/" + route, body, { withCredentials: true })
}

export function apiFetch(route = "") {
    return axios.get("http://localhost:5000/" + route, { withCredentials: true })
}

export async function isLoggedIn() {
    try {
        const response = await apiFetch("auth/is-logged-in");
        const loggedIn = response.data;
        return loggedIn;
    } catch (error) {
       
        return false;
    }
}

  