import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETPROMO_DATA, GETPROMO_ERROR } from '../type';

export const GetPromotionsAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  GetPromotions' , params)
        const response = await axios.get(`${BaseUrl}/get_promotions?business_id=${params.business_id}`);

        dispatch({
            type: GETPROMO_DATA,
            payload: response.data,
        });

        // console.log('GetPromotions Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetPromotions Error:', error);

        dispatch({
            type: GETPROMO_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
