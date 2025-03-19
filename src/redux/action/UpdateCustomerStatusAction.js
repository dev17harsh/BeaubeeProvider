import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { UPDATECUSTOMERSTATUS_DATA, UPDATECUSTOMERSTATUS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateCustomerStatusAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/update_customer_status?business_id=${userId}&user_id=${params?.user_id}&status=${params?.status}`);

        dispatch({
            type: UPDATECUSTOMERSTATUS_DATA,
            payload: response.data,
        });

        console.log('UpdateCustomerStatus Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('UpdateCustomerStatus Error:', error);

        dispatch({
            type: UPDATECUSTOMERSTATUS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const UpdateCustomerStatusRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATECUSTOMERSTATUS_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: UPDATECUSTOMERSTATUS_ERROR,
            payload: console.log(e),
        });
    }
};