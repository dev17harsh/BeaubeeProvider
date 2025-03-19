import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { CREATEPOST_DATA, CREATEPOST_ERROR } from '../type';

export const CreatePostAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  CreatePost' , params)

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        };

        const response = await axios.post(`${BaseUrl}/create_post`, params, {
            headers,
        });

        dispatch({
            type: CREATEPOST_DATA,
            payload: response.data,
        });

        // console.log('CreatePost Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('CreatePost Error:', error);

        dispatch({
            type: CREATEPOST_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};



export const CreatePostRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: CREATEPOST_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: CREATEPOST_ERROR,
            payload: console.log(e),
        });
    }
};
