import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETPREPAIDPACKAGE_DATA, GETPREPAIDPACKAGE_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetPrepaidPackageAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/get_packages?business_id=${userId}`);

        dispatch({
            type: GETPREPAIDPACKAGE_DATA,
            payload: response.data,
        });

        console.log('GetPrepaidPackage Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetPrepaidPackage Error:', error);

        dispatch({
            type: GETPREPAIDPACKAGE_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
