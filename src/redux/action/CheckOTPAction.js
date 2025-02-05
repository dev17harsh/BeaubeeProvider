import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETCHECKOTP_DATA, GETCHECKOTP_ERROR } from '../type';

export const CheckOTPAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        console.log('params ===>  CheckOTPAction' , params)
        const response = await axios.get(`${BaseUrl}/vendor_check_otp?business_id=${params.business_id}&otp=${params.otp}`);

        dispatch({
            type: GETCHECKOTP_DATA,
            payload: response.data,
        });

        console.log('CheckOTPAction Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('CheckOTP Error:', error);

        dispatch({
            type: GETCHECKOTP_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};


export const CheckOTPDataClean = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GETCHECKOTP_DATA,
            payload: {},
        });
    } catch (error) {
        console.log(error),
            dispatch({
                type: GETCHECKOTP_ERROR,
                payload: {}
            });
    }

}
