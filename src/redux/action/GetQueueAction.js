import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETQUEUE_DATA, GETQUEUE_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetQueueAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        console.log('GetQueueAction hit ===>0' , userId)
        const response = await axios.get(`${BaseUrl}/get_queue?business_id=${userId}&staff_id=${params?.staff_id}`);

        dispatch({
            type: GETQUEUE_DATA,
            payload: response.data,
        });

        console.log('GetQueue Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetQueue Error:', error);

        dispatch({
            type: GETQUEUE_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};