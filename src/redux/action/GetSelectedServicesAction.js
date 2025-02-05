import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETSELECTEDSERVICES_DATA, GETSELECTEDSERVICES_ERROR } from '../type';

export const GetSelectedServicesAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  GetSelectedServicesAction' , params)
        const response = await axios.get(`${BaseUrl}/get_business_category?business_id=${params.business_id}`);

        dispatch({
            type: GETSELECTEDSERVICES_DATA,
            payload: response.data,
        });

        // console.log('GetSelectedServicesAction Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetSelectedServicesAction Error:', error);

        dispatch({
            type: GETSELECTEDSERVICES_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
