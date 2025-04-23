import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { DELETEROSTER_DATA, DELETEROSTER_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DeleteRosterAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/delete_roster?business_id=${userId}&roaster_id=${params?.roaster_id}`);

        dispatch({
            type: DELETEROSTER_DATA,
            payload: response.data,
        });

        console.log('DeleteRoster Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('DeleteRoster Error:', error);

        dispatch({
            type: DELETEROSTER_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const DeleteRosterRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: DELETEROSTER_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: DELETEROSTER_ERROR,
            payload: console.log(e),
        });
    }
};