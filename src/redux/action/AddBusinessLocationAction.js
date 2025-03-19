import axios from 'axios';
import { ADDBUSINESSLOCATION_DATA, ADDBUSINESSLOCATION_ERROR } from '../type';
import { BaseUrl } from '../../components/baseUrl';

export const AddBusinessLocationAction = (params) => async (dispatch) => {
  try {

    // Set headers for the request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    // Make API request
    const response = await axios.post(`${BaseUrl}/add_business_locations`, params, {
      headers,
    });

    console.log('AddBusinessLocation response:', response.data);
    dispatch({
      type: ADDBUSINESSLOCATION_DATA,
      payload: response.data,
    });
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('AddBusinessLocation error response:', error.response);
      dispatch({
        type: ADDBUSINESSLOCATION_ERROR,
        payload: error.response.data || 'An error occurred during AddBusinessLocation.',
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('AddBusinessLocation error request:', error.request);
      dispatch({
        type: ADDBUSINESSLOCATION_ERROR,
        payload: 'No response received from the server. Please try again.',
      });
    } else {
      // Other errors
      console.error('AddBusinessLocation error:', error.message);
      dispatch({
        type: ADDBUSINESSLOCATION_ERROR,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }
};



export const AddBusinessLocationRemoveAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: ADDBUSINESSLOCATION_DATA,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: ADDBUSINESSLOCATION_ERROR,
      payload: console.log(e),
    });
  }
};