import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { UPDATEFUTUREBOOKINGS_DATA, UPDATEFUTUREBOOKINGS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateFutureBookingsAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/update_future_booking_status?business_id=${userId}&status=${params?.status}`);

        dispatch({
            type: UPDATEFUTUREBOOKINGS_DATA,
            payload: response.data,
        });

        console.log('UpdateFutureBookings Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('UpdateFutureBookings Error:', error);

        dispatch({
            type: UPDATEFUTUREBOOKINGS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const UpdateFutureBookingsRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATEFUTUREBOOKINGS_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: UPDATEFUTUREBOOKINGS_ERROR,
            payload: console.log(e),
        });
    }
};