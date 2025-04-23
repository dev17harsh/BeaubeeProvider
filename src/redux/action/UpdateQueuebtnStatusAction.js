import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { UPDATEQUEUEBTNSTATUS_DATA, UPDATEQUEUEBTNSTATUS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateQueuebtnStatusAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/update_queue_toogle_status?business_id=${userId}&status=${params?.status}`);

        dispatch({
            type: UPDATEQUEUEBTNSTATUS_DATA,
            payload: response.data,
        });

        console.log('UpdateQueuebtnStatus Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('UpdateQueuebtnStatus Error:', error);

        dispatch({
            type: UPDATEQUEUEBTNSTATUS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const UpdateQueuebtnStatusRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATEQUEUEBTNSTATUS_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: UPDATEQUEUEBTNSTATUS_ERROR,
            payload: console.log(e),
        });
    }
};