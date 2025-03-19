import axios from 'axios';
import { ADDPREPAID_DATA, ADDPREPAID_ERROR } from '../type';
import { BaseUrl } from '../../components/baseUrl';

export const AddPrepaidAction = (params) => async (dispatch) => {
  try {

    // Set headers for the request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    // Make API request
    const response = await axios.post(`${BaseUrl}/create_prepaid`, params, {
      headers,
    });

    console.log('AddPrepaid response:', response.data);
    dispatch({
      type: ADDPREPAID_DATA,
      payload: response.data,
    });
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('AddPrepaid error response:', error.response);
      dispatch({
        type: ADDPREPAID_ERROR,
        payload: error.response.data || 'An error occurred during AddPrepaid.',
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('AddPrepaid error request:', error.request);
      dispatch({
        type: ADDPREPAID_ERROR,
        payload: 'No response received from the server. Please try again.',
      });
    } else {
      // Other errors
      console.error('AddPrepaid error:', error.message);
      dispatch({
        type: ADDPREPAID_ERROR,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }
};



export const AddPrepaidRemoveAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: ADDPREPAID_DATA,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: ADDPREPAID_ERROR,
      payload: console.log(e),
    });
  }
};