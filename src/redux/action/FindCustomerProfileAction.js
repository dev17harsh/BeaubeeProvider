import axios from 'axios';
import { FINDNEWCUSTOMERPROFILE_DATA, FINDNEWCUSTOMERPROFILE_ERROR } from '../type';
import { BaseUrl } from '../../components/baseUrl';

export const FindCustomerProfileAction = (params) => async (dispatch) => {
  try {

    // Set headers for the request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    // Make API request
    const response = await axios.post(`${BaseUrl}/find_new_customer_for_gift`, params, {
      headers,
    });

    console.log('FindCustomerProfile response:', response.data);
    dispatch({
      type: FINDNEWCUSTOMERPROFILE_DATA,
      payload: response.data,
    });
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('FindCustomerProfile error response:', error.response);
      dispatch({
        type: FINDNEWCUSTOMERPROFILE_ERROR,
        payload: error.response.data || 'An error occurred during FindCustomerProfile.',
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('FindCustomerProfile error request:', error.request);
      dispatch({
        type: FINDNEWCUSTOMERPROFILE_ERROR,
        payload: 'No response received from the server. Please try again.',
      });
    } else {
      // Other errors
      console.error('FindCustomerProfile error:', error.message);
      dispatch({
        type: FINDNEWCUSTOMERPROFILE_ERROR,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }
};



export const FindCustomerProfileRemoveAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: FINDNEWCUSTOMERPROFILE_DATA,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: FINDNEWCUSTOMERPROFILE_ERROR,
      payload: console.log(e),
    });
  }
};