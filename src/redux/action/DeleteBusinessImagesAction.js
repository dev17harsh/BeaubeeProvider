import axios from 'axios';
import { BaseUrl } from "../../components/baseUrl";
import { DELETEBUSINESSIMAGE_DATA, DELETEBUSINESSIMAGE_ERROR } from '../type';

export const DeleteBusinessImagesAction = (params) => async (dispatch) => {
    try {
        // Axios POST request
        // console.log('params ===>  DeleteBusinessImages' , params)
        const response = await axios.get(`${BaseUrl}/delete_business_image?business_id=${params?.business_id}&business_image_id=${params?.business_image_id}`);

        dispatch({
            type: DELETEBUSINESSIMAGE_DATA,
            payload: response.data,
        });

        // console.log('DeleteBusinessImages Successful:', response.data);

    } catch (error) {
        // Handle error and dispatch AUTH_ERROR
        console.error('DeleteBusinessImages Error:', error);

        dispatch({
            type: DELETEBUSINESSIMAGE_ERROR,
            payload: error.response?.data || error.message,
        });
    }
};



export const DeleteBusinessImagesRemoveAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: DELETEBUSINESSIMAGE_DATA,
      payload: {},
    });
  } catch (e) {
    dispatch({
      type: DELETEBUSINESSIMAGE_ERROR,
      payload: console.log(e),
    });
  }
};
