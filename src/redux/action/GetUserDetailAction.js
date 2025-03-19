import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETUSERDETAIL_DATA, GETUSERDETAIL_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetUserDetailAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  GetUserDetail' , params)
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/business_profile?business_id=${userId}`);

        dispatch({
            type: GETUSERDETAIL_DATA,
            payload: response.data,
        });

        // console.log('GetUserDetail Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetUserDetail Error:', error);

        dispatch({
            type: GETUSERDETAIL_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

