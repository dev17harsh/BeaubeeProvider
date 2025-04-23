import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETLEFTBOOKINGS_DATA, GETLEFTBOOKINGS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetLeftBookingsAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/get_pending_bookings?business_id=${userId}&date=${params?.date}`);

        dispatch({
            type: GETLEFTBOOKINGS_DATA,
            payload: response.data,
        });

        console.log('GetLeftBookings Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetLeftBookings Error:', error);

        dispatch({
            type: GETLEFTBOOKINGS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
