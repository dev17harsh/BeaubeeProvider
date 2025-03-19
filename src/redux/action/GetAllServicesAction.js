import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETALLSERVICES_DATA, GETALLSERVICES_ERROR } from '../type';

export const GetAllServicesAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  GetAllServices' , params)
        const response = await axios.get(`${BaseUrl}/get_business_all_services?business_id=${params.business_id}`);

        dispatch({
            type: GETALLSERVICES_DATA,
            payload: response.data,
        });

        // console.log('GetAllServices Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetAllServices Error:', error);

        dispatch({
            type: GETALLSERVICES_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
