import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { UPDATESHOPCLOSELY_DATA, UPDATESHOPCLOSELY_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateShopCloselyAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/update_close_shop_status?business_id=${userId}&status=${params?.status}`);

        dispatch({
            type: UPDATESHOPCLOSELY_DATA,
            payload: response.data,
        });

        console.log('UpdateShopClosely Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('UpdateShopClosely Error:', error);

        dispatch({
            type: UPDATESHOPCLOSELY_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const UpdateShopCloselyRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATESHOPCLOSELY_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: UPDATESHOPCLOSELY_ERROR,
            payload: console.log(e),
        });
    }
};