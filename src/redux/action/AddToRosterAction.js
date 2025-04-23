import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { ADDTOROSTER_DATA, ADDTOROSTER_ERROR } from '../type';

export const AddToRosterAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  AddToRoster' , params)

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        };

        const response = await axios.post(`${BaseUrl}/add_to_roster`, params, {
            headers,
        });

        dispatch({
            type: ADDTOROSTER_DATA,
            payload: response.data,
        });

        // console.log('AddToRoster Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('AddToRoster Error:', error);

        dispatch({
            type: ADDTOROSTER_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};



export const AddToRosterRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: ADDTOROSTER_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: ADDTOROSTER_ERROR,
            payload: console.log(e),
        });
    }
};
