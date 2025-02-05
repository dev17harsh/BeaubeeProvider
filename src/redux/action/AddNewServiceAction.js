import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { ADDNEWSERVICE_DATA, ADDNEWSERVICE_ERROR } from '../type';

export const AddNewServiceAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  AddNewServiceAction' , params)
        const response = await axios.get(`${BaseUrl}/add_business_category?business_id=${params.business_id}&category_id=${params.category_id}`);

        dispatch({
            type: ADDNEWSERVICE_DATA,
            payload: response.data,
        });

        console.log('AddNewServiceAction Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('AddNewService Error:', error);

        dispatch({
            type: ADDNEWSERVICE_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};


export const AddNewServiceDataClean = (params) => async (dispatch) => {
    try {
        dispatch({
            type: ADDNEWSERVICE_DATA,
            payload: {},
        });
    } catch (error) {
        console.log(error),
            dispatch({
                type: ADDNEWSERVICE_ERROR,
                payload: {}
            });
    }

}
