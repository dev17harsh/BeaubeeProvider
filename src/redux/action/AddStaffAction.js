import axios from 'axios';
import { ADDSTAFF_DATA, ADDSTAFF_ERROR } from '../type';
import { BaseUrl } from '../../components/baseUrl';

export const AddStaffAction = (params) => async (dispatch) => {
  try {

    // Set headers for the request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    // Make API request
    const response = await axios.post(`${BaseUrl}/add_staff`, params, {
      headers,
    });

    console.log('AddStaff response:', response.data);
    dispatch({
      type: ADDSTAFF_DATA,
      payload: response.data,
    });
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('AddStaff error response:', error.response);
      dispatch({
        type: ADDSTAFF_ERROR,
        payload: error.response.data || 'An error occurred during AddStaff.',
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('AddStaff error request:', error.request);
      dispatch({
        type: ADDSTAFF_ERROR,
        payload: 'No response received from the server. Please try again.',
      });
    } else {
      // Other errors
      console.error('AddStaff error:', error.message);
      dispatch({
        type: ADDSTAFF_ERROR,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }
};



export const AddStaffRemoveAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: ADDSTAFF_DATA,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: ADDSTAFF_ERROR,
      payload: console.log(e),
    });
  }
};