import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { UPDATEBOOKINGSTATUS_DATA, UPDATEBOOKINGSTATUS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateBookingStatusAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/update_booking_status?business_id=${userId}&booking_id=${params?.booking_id}&status=${params?.status}`);

        dispatch({
            type: UPDATEBOOKINGSTATUS_DATA,
            payload: response.data,
        });

        console.log('UpdateBookingStatus Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('UpdateBookingStatus Error:', error);

        dispatch({
            type: UPDATEBOOKINGSTATUS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const UpdateBookingStatusRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATEBOOKINGSTATUS_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: UPDATEBOOKINGSTATUS_ERROR,
            payload: console.log(e),
        });
    }
};