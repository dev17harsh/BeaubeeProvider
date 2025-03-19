import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { UPDATEPROMOSTATUS_DATA, UPDATEPROMOSTATUS_ERROR } from '../type';

export const UpdatePromoStatusAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  UpdatePromoStatus' , params)
        const response = await axios.get(`${BaseUrl}/promotion_action?business_id=${params.business_id}&promo_id=${params.promo_id}&status=${params.status}`);

        dispatch({
            type: UPDATEPROMOSTATUS_DATA,
            payload: response.data,
        });

        // console.log('UpdatePromoStatus Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('UpdatePromoStatus Error:', error);

        dispatch({
            type: UPDATEPROMOSTATUS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};


export const UpdatePromoStatusRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATEPROMOSTATUS_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: UPDATEPROMOSTATUS_ERROR,
            payload: console.log(e),
        });
    }
};
