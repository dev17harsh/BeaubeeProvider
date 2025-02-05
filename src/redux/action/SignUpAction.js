import axios from 'axios';
import { SIGNUP_USER, SIGNUP_ERROR, SIGNUP_REMOVE } from '../type';
import { BaseUrl } from '../../components/baseUrl';

export const signupUserAction = (params) => async (dispatch) => {
  try {

    // Set headers for the request
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    // Make API request
    const response = await axios.post(`${BaseUrl}/business_signup`, params, {
      headers,
    });

    console.log('Signup API response:', response.data);
    dispatch({
      type: SIGNUP_USER,
      payload: response.data,
    });
  } catch (error) {
    // Handle network errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Signup error response:', error.response);
      dispatch({
        type: SIGNUP_ERROR,
        payload: error.response.data || 'An error occurred during signup.',
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('Signup error request:', error.request);
      dispatch({
        type: SIGNUP_ERROR,
        payload: 'No response received from the server. Please try again.',
      });
    } else {
      // Other errors
      console.error('Signup error:', error.message);
      dispatch({
        type: SIGNUP_ERROR,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }
};



export const signupUserRemoveAction = (params) => async (dispatch) => {
    try {
        dispatch({
            type: SIGNUP_REMOVE,
            payload: {},
        });
    } catch (e) {
        dispatch({
            type: SIGNUP_ERROR,
            payload: console.log(e),
        });
    }
};