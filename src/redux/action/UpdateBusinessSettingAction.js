import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { UPDATESETTINGS_DATA, UPDATESETTINGS_ERROR } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateBusinessSettingAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        const userId = await AsyncStorage.getItem('token')
        const response = await axios.get(`${BaseUrl}/business_setting?business_id=${userId}&action_for=${params?.actionType}&status=${params?.status}`);

        dispatch({
            type: UPDATESETTINGS_DATA,
            payload: response.data,
        });

        console.log('UpdateBusinessSetting Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('UpdateBusinessSetting Error:', error);

        dispatch({
            type: UPDATESETTINGS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};

export const UpdateBusinessSettingRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATESETTINGS_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: UPDATESETTINGS_ERROR,
            payload: console.log(e),
        });
    }
};