import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETBUSINESSTYPE_DATA, GETBUSINESSTYPE_ERROR } from '../type';

export const GetBusinessType = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  GetBusinessType' , params)
        const response = await axios.get(`${BaseUrl}/get_business_type`);

        dispatch({
            type: GETBUSINESSTYPE_DATA,
            payload: response.data,
        });

        // console.log('GetBusinessType Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('Login Error:', error);

        dispatch({
            type: GETBUSINESSTYPE_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
