import axios from 'axios';
import {UPDATEBUSINESSPASSWORD_DATA, UPDATEBUSINESSPASSWORD_ERROR} from '../type';
import { BaseUrl } from '../../components/baseUrl';

export const UpdateBusinessPasswordAction = (params) => async (dispatch) => {
  try {

    // Set headers for the request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    // Make API request
    const response = await axios.post(`${BaseUrl}/vendor_change_password`, params, {
      headers,
    });

    console.log('UpdateBusinessPassword response:', response.data);
    dispatch({
      type: UPDATEBUSINESSPASSWORD_DATA,
      payload: response.data,
    });
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('UpdateBusinessPassword error response:', error.response);
      dispatch({
        type: UPDATEBUSINESSPASSWORD_ERROR,
        payload: error.response.data || 'An error occurred during UpdateBusinessPassword.',
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('UpdateBusinessPassword error request:', error.request);
      dispatch({
        type: UPDATEBUSINESSPASSWORD_ERROR,
        payload: 'No response received from the server. Please try again.',
      });
    } else {
      // Other errors
      console.error('UpdateBusinessPassword error:', error.message);
      dispatch({
        type: UPDATEBUSINESSPASSWORD_ERROR,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }
};



export const UpdateBusinessPasswordRemoveAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATEBUSINESSPASSWORD_DATA,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: UPDATEBUSINESSPASSWORD_ERROR,
      payload: console.log(e),
    });
  }
};