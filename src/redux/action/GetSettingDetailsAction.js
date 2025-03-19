import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETSETTINGDETAILS_DATA, GETSETTINGDETAILS_ERROR } from '../type';

export const GetSettingDetailsAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  GetSettingDetails' , params)
        const response = await axios.get(`${BaseUrl}/get_business_setting?business_id=${params.business_id}`);

        dispatch({
            type: GETSETTINGDETAILS_DATA,
            payload: response.data,
        });

        // console.log('GetSettingDetails Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetSettingDetails Error:', error);

        dispatch({
            type: GETSETTINGDETAILS_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
