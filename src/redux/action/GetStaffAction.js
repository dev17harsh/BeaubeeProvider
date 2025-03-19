import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { GETSTAFF_DATA, GETSTAFF_ERROR } from '../type';

export const GetStaffAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  GetStaff' , params)
        const response = await axios.get(`${BaseUrl}/get_staff?business_id=${params?.business_id}&staff_id=`);

        dispatch({
            type: GETSTAFF_DATA,
            payload: response.data,
        });

        // console.log('GetStaff Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('GetStaff Error:', error);

        dispatch({
            type: GETSTAFF_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};
