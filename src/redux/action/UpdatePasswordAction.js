import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETUPDATEPASSWORD_DATA, GETUPDATEPASSWORD_ERROR } from '../type';

export const UpdatePasswordAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        console.log('params ===>  UpdatePasswordAction' , params)
        const response = await axios.get(`${BaseUrl}/vendor_create_new_password?business_id=${params.business_id}&password=${params.password}`);

        dispatch({
            type: GETUPDATEPASSWORD_DATA,
            payload: response.data,
        });

        console.log('UpdatePasswordAction Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('UpdatePassword Error:', error);

        dispatch({
            type: GETUPDATEPASSWORD_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};


export const UpdatePasswordDataClean = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GETUPDATEPASSWORD_DATA,
            payload: {},
        });
    } catch (error) {
        console.log(error),
            dispatch({
                type: GETUPDATEPASSWORD_ERROR,
                payload: {}
            });
    }

}
