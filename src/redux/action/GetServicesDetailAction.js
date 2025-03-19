import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETSERVICESDETAIL_DATA, GETSERVICESDETAIL_ERROR } from '../type';

export const GetServicesDetailAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  GetServicesDetail' , params)
        const response = await axios.get(`${BaseUrl}/get_business_service?business_id=${params?.business_id}&category_id=${params?.category_id}&service_type=${params?.service_type}`);

        dispatch({
            type: GETSERVICESDETAIL_DATA,
            payload: response.data,
        });

        console.log('GetServicesDetail Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetServicesDetail Error:', error);

        dispatch({
            type: GETSERVICESDETAIL_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
