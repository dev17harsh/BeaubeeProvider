import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETSENDGIFT_DATA, GETSENDGIFT_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetSendGiftCardAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/get_gift_card?business_id=${userId}`);

        dispatch({
            type: GETSENDGIFT_DATA,
            payload: response.data,
        });

        console.log('GetSendGiftCard Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetSendGiftCard Error:', error);

        dispatch({
            type: GETSENDGIFT_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
