import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETBOOKINGSDETAILS_DATA, GETBOOKINGSDETAILS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetBookingDetailsAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/get_booking_details?booking_id=${params?.booking_id}&business_id=${userId}`);

        dispatch({
            type: GETBOOKINGSDETAILS_DATA,
            payload: response.data,
        });

        console.log('GetBookingDetails Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetBookingDetails Error:', error);

        dispatch({
            type: GETBOOKINGSDETAILS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
