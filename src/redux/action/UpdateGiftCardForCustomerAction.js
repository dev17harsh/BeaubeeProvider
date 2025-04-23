import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { UPDATEGIFTCARDCUSTOMER_DATA, UPDATEGIFTCARDCUSTOMER_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateGiftCardForCustomerAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        // console.log("params , " , params , userId , `${BaseUrl}/enable_gift_card_for_regular_customer?business_id=${userId}&${params?.action}=${params?.status}`)
        const response = await axios.get(`${BaseUrl}/enable_gift_card_for_regular_customer?business_id=${userId}&${params?.action}=${params?.status}`);

        dispatch({
            type: UPDATEGIFTCARDCUSTOMER_DATA,
            payload: response.data,
        });

        console.log('UpdateGiftCardForCustomer Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('UpdateGiftCardForCustomer Error:', error);

        dispatch({
            type: UPDATEGIFTCARDCUSTOMER_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const UpdateGiftCardForCustomerRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATEGIFTCARDCUSTOMER_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: UPDATEGIFTCARDCUSTOMER_ERROR,
            payload: console.log(e),
        });
    }
};