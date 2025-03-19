import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { SENDGIFTS_DATA } from '../type';

export const SendGiftAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  SendGift' , params)

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        };

        const response = await axios.post(`${BaseUrl}/send_gift_card`, params, {
            headers,
        });

        dispatch({
            type: SENDGIFTS_DATA,
            payload: response.data,
        });

        // console.log('SendGift Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('SendGift Error:', error);

        dispatch({
            type: SENDGIFTS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};



export const SendGiftRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: SENDGIFTS_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: SENDGIFTS_ERROR,
            payload: console.log(e),
        });
    }
};
