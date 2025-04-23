import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETROSTERDETAILS_DATA, GETROSTERDETAILS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetRosterDetailsAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/get_shifts_by_roater?business_id=${userId}&month=${params?.date}`);

        dispatch({
            type: GETROSTERDETAILS_DATA,
            payload: response.data,
        });

        console.log('GetRosterDetails Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetRosterDetails Error:', error);

        dispatch({
            type: GETROSTERDETAILS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
