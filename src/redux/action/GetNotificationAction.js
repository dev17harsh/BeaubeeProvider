import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETNOTIFICATION_DATA, GETNOTIFICATION_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetNotificationAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/get_business_notifications?business_id=${userId}`);

        dispatch({
            type: GETNOTIFICATION_DATA,
            payload: response.data,
        });

        console.log('GetNotification Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('Login Error:', error);

        dispatch({
            type: GETNOTIFICATION_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
