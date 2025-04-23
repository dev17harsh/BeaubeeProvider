import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETBOOKINGS_DATA, GETBOOKINGS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetBookingsAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/get_bookings?business_id=${userId}&appointment_date=${params?.appointment_date}&staff_id=${params?.staff_id}`);

        dispatch({
            type: GETBOOKINGS_DATA,
            payload: response.data,
        });

        console.log('GetBookings Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetBookings Error:', error);

        dispatch({
            type: GETBOOKINGS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};