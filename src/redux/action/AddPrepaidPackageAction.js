import axios from 'axios';
import { ADDPREPAIDPACKAGE_DATA, ADDPREPAIDPACKAGE_ERROR } from '../type';
import { BaseUrl } from '../../components/baseUrl';

export const AddPrepaidPackageAction = (params) => async (dispatch) => {
  try {

    // Set headers for the request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    // Make API request
    const response = await axios.post(`${BaseUrl}/add_prepaid_package`, params, {
      headers,
    });

    console.log('AddPrepaidPackage response:', response.data);
    dispatch({
      type: ADDPREPAIDPACKAGE_DATA,
      payload: response.data,
    });
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('AddPrepaidPackage error response:', error.response);
      dispatch({
        type: ADDPREPAIDPACKAGE_ERROR,
        payload: error.response.data || 'An error occurred during AddPrepaidPackage.',
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('AddPrepaidPackage error request:', error.request);
      dispatch({
        type: ADDPREPAIDPACKAGE_ERROR,
        payload: 'No response received from the server. Please try again.',
      });
    } else {
      // Other errors
      console.error('AddPrepaidPackage error:', error.message);
      dispatch({
        type: ADDPREPAIDPACKAGE_ERROR,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }
};



export const AddPrepaidPackageRemoveAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: ADDPREPAIDPACKAGE_DATA,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: ADDPREPAIDPACKAGE_ERROR,
      payload: console.log(e),
    });
  }
};