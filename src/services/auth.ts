///auth.ts
import axios from "axios";
import { LoginUser, RegisterUser } from "../@types/types";

export const baseUrl = "http://localhost:8080/api/v1";
export const usersUrl = `${baseUrl}/users`;
export const loginUrl = `${baseUrl}/users/login`;


export const register = (data: RegisterUser) => axios.post(usersUrl, data);


export const login = (data: LoginUser) => axios.post(loginUrl, data);


export const getUsers = () => {
    const token = localStorage.getItem('token');
    return axios.get(usersUrl, {
        headers: {
            'x-auth-token': token
        }
    });
};


export const userDetails = (id: string) => {
    let url = usersUrl;
    if (id) {
        url = `${usersUrl}/${id}`;
    }
    return axios.get(url, {
        headers: {
            "x-auth-token": localStorage.getItem("token") || "",
        },
    });
};

export const businessUser = (id: string) => {
    const url = `${usersUrl}/${id}`;
    return axios.patch(url, {
        isBusiness: true,
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
};

export const editUser = (data: RegisterUser, id: string | undefined) => {
    return axios.put(`${usersUrl}/${id}`, data, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    })
}


export const deleteUser = (id: string) => {
    return axios.delete(`${usersUrl}/${id}`, {
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    });
};



export const auth = {
    register,
    login,
    userDetails,
    businessUser,
    editUser,
    deleteUser,

};

export default auth;