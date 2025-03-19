import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETPOST_DATA, GETPOST_ERROR } from '../type';

export const GetPostAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  GetPost' , params)
        const response = await axios.get(`${BaseUrl}/get_posts?business_id=${params?.business_id}&category_id=${params?.category_id}`);

        dispatch({
            type: GETPOST_DATA,
            payload: response.data,
        });

        // console.log('GetPost Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetPost Error:', error);

        dispatch({
            type: GETPOST_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
