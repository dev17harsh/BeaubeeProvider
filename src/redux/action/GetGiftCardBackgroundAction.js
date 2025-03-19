import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETGIFTCARDBACKGROUND_DATA, GETGIFTCARDBACKGROUND_ERROR } from '../type';

export const GetGiftCardBackgroundAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const response = await axios.get(`${BaseUrl}/get_card_background`);

        dispatch({
            type: GETGIFTCARDBACKGROUND_DATA,
            payload: response.data,
        });

        console.log('GetGiftCardBackground Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetGiftCardBackground Error:', error);

        dispatch({
            type: GETGIFTCARDBACKGROUND_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
