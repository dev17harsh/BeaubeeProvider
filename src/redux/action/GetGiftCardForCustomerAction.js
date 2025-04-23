import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETGIFTCARDCUSTOMER_DATA, GETGIFTCARDCUSTOMER_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetGiftCardForCustomerAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/get_enable_gift_card_status?business_id=${userId}`);

        dispatch({
            type: GETGIFTCARDCUSTOMER_DATA,
            payload: response.data,
        });

        console.log('GetGiftCardForCustomer Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetGiftCardForCustomer Error:', error);

        dispatch({
            type: GETGIFTCARDCUSTOMER_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const GetGiftCardForCustomerRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GETGIFTCARDCUSTOMER_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: GETGIFTCARDCUSTOMER_ERROR,
            payload: console.log(e),
        });
    }
};