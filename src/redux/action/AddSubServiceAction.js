import axios from 'axios';
import { GETSUBSERVICEAPI_DATA, GETSUBSERVICEAPI_ERROR } from '../type';
import { BaseUrl } from '../../components/baseUrl';

export const AddSubServiceAction = (params) => async (dispatch) => {
  try {

    // Set headers for the request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    // Make API request
    const response = await axios.post(`${BaseUrl}/add_business_services`, params, {
      headers,
    });

    console.log('AddSubService response:', response.data);
    dispatch({
      type: GETSUBSERVICEAPI_DATA,
      payload: response.data,
    });
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('AddSubService error response:', error.response);
      dispatch({
        type: GETSUBSERVICEAPI_ERROR,
        payload: error.response.data || 'An error occurred during AddSubService.',
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('AddSubService error request:', error.request);
      dispatch({
        type: GETSUBSERVICEAPI_ERROR,
        payload: 'No response received from the server. Please try again.',
      });
    } else {
      // Other errors
      console.error('AddSubService error:', error.message);
      dispatch({
        type: GETSUBSERVICEAPI_ERROR,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }
};



export const AddSubServiceRemoveAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GETSUBSERVICEAPI_DATA,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: GETSUBSERVICEAPI_ERROR,
      payload: console.log(e),
    });
  }
};