import axios from 'axios';
import { SUBMITREPORT_DATA, SUBMITREPORT_ERROR } from '../type';
import { BaseUrl } from '../../components/baseUrl';

export const SubmitReportAction = (params) => async (dispatch) => {
  try {

    // Set headers for the request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    // Make API request
    const response = await axios.post(`${BaseUrl}/submit_report`, params, {
      headers,
    });

    console.log('SubmitReport response:', response.data);
    dispatch({
      type: SUBMITREPORT_DATA,
      payload: response.data,
    });
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('SubmitReport error response:', error.response);
      dispatch({
        type: SUBMITREPORT_ERROR,
        payload: error.response.data || 'An error occurred during SubmitReport.',
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('SubmitReport error request:', error.request);
      dispatch({
        type: SUBMITREPORT_ERROR,
        payload: 'No response received from the server. Please try again.',
      });
    } else {
      // Other errors
      console.error('SubmitReport error:', error.message);
      dispatch({
        type: SUBMITREPORT_ERROR,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }
};



export const SubmitReportRemoveAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: SUBMITREPORT_DATA,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: SUBMITREPORT_ERROR,
      payload: console.log(e),
    });
  }
};