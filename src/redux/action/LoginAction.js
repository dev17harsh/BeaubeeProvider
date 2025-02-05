import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ERROR, AUTH_LOGIN, AUTH_REMOVE } from "../type";
import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";

export const loginUser = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  login' , params)

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        };
        const response = await axios.post(`${BaseUrl}/vendor_login`, params, {
            headers,
        });

        dispatch({
            type: AUTH_LOGIN,
            payload: response.data,
        });

        // console.log('Login Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('Login Error:', error);

        dispatch({
            type: AUTH_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const UserLoginDataClean = (params) => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_REMOVE,
            payload: {},
        });
    } catch (error) {
        console.log(error),
            dispatch({
                type: AUTH_ERROR,
                payload: {}
            });
    }

}