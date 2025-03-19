import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETCUSTOMERDETAILS_DATA, GETCUSTOMERDETAILS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetCustomerDetailsAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/get_customer?business_id=${userId}&status=${params}`);

        dispatch({
            type: GETCUSTOMERDETAILS_DATA,
            payload: response.data,
        });

        console.log('GetCustomerDetails Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetCustomerDetails Error:', error);

        dispatch({
            type: GETCUSTOMERDETAILS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
