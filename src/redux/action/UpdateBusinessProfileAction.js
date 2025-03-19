import axios from 'axios';
import { UPDATEBUSINESSPROFILE_DATA, UPDATEBUSINESSPROFILE_ERROR } from '../type';
import { BaseUrl } from '../../components/baseUrl';

export const UpdateBusinessProfileAction = (params) => async (dispatch) => {
  try {

    // Set headers for the request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    // Make API request
    const response = await axios.post(`${BaseUrl}/update_business_profile`, params, {
      headers,
    });

    console.log('UpdateBusinessProfile response:', response.data);
    dispatch({
      type: UPDATEBUSINESSPROFILE_DATA,
      payload: response.data,
    });
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('UpdateBusinessProfile error response:', error.response);
      dispatch({
        type: UPDATEBUSINESSPROFILE_ERROR,
        payload: error.response.data || 'An error occurred during UpdateBusinessProfile.',
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('UpdateBusinessProfile error request:', error.request);
      dispatch({
        type: UPDATEBUSINESSPROFILE_ERROR,
        payload: 'No response received from the server. Please try again.',
      });
    } else {
      // Other errors
      console.error('UpdateBusinessProfile error:', error.message);
      dispatch({
        type: UPDATEBUSINESSPROFILE_ERROR,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }
};



export const UpdateBusinessProfileRemoveAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATEBUSINESSPROFILE_DATA,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: UPDATEBUSINESSPROFILE_ERROR,
      payload: console.log(e),
    });
  }
};