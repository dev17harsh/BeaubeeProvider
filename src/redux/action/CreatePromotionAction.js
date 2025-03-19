import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { CREATEPROMO_DATA, CREATEPROMO_ERROR } from '../type';

export const CreatePromotionAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  CreatePromotion' , params)

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        };

        const response = await axios.post(`${BaseUrl}/create_promo`, params, {
            headers,
        });

        dispatch({
            type: CREATEPROMO_DATA,
            payload: response.data,
        });

        // console.log('CreatePromotion Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('CreatePromotion Error:', error);

        dispatch({
            type: CREATEPROMO_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};



export const CreatePromotionRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: CREATEPROMO_DATA,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: CREATEPROMO_ERROR,
            payload: console.log(e),
        });
    }
};
