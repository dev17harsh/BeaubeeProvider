import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETCATEGORY_DATA, GETCATEGORY_ERROR } from '../type';

export const GetCategoryAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  GetCategory' , params)
        const response = await axios.get(`${BaseUrl}/get_category`);

        dispatch({
            type: GETCATEGORY_DATA,
            payload: response.data,
        });

        // console.log('GetCategory Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetCategory Error:', error);

        dispatch({
            type: GETCATEGORY_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
