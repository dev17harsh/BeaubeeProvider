import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETFORGETEMAILRES_DATA, GETFORGETEMAILRES_ERROR } from '../type';

export const ForgetEmailAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  ForgetEmailAction' , params)
        const response = await axios.get(`${BaseUrl}/vendor_send_otp?email=${params?.email}`);

        dispatch({
            type: GETFORGETEMAILRES_DATA,
            payload: response.data,
        });

        console.log('ForgetEmailAction Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('ForgetEmail Error:', error);

        dispatch({
            type: GETFORGETEMAILRES_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};


export const ForgetEmailDataClean = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GETFORGETEMAILRES_DATA,
            payload: {},
        });
    } catch (error) {
        console.log(error),
            dispatch({
                type: GETFORGETEMAILRES_ERROR,
                payload: {}
            });
    }

}
