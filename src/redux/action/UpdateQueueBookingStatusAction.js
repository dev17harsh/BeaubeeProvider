import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { UPDATEQUEUEBOOKINGSTATUS_DATA, UPDATEQUEUEBOOKINGSTATUS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateQueueBookingStatusAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/update_queue_status?business_id=${userId}&booking_id=${params?.booking_id}&status=${params?.status}`);

        dispatch({
            type: UPDATEQUEUEBOOKINGSTATUS_DATA,
            payload: response.data,
        });

        console.log('UpdateQueueBooking Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('UpdateQueueBooking Error:', error);

        dispatch({
            type: UPDATEQUEUEBOOKINGSTATUS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const UpdateQueueBookingRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATEQUEUEBOOKINGSTATUS_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: UPDATEQUEUEBOOKINGSTATUS_ERROR,
            payload: console.log(e),
        });
    }
};