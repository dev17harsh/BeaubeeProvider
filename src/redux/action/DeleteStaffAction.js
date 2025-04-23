import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { DELETESTAFF_DATA, DELETESTAFF_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DeleteStaffAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/delete_staff?business_id=${userId}&staff_id=${params?.staff_id}`);

        dispatch({
            type: DELETESTAFF_DATA,
            payload: response.data,
        });

        console.log('DeleteStaff Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('DeleteStaff Error:', error);

        dispatch({
            type: DELETESTAFF_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const DeleteStaffRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: DELETESTAFF_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: DELETESTAFF_ERROR,
            payload: console.log(e),
        });
    }
};