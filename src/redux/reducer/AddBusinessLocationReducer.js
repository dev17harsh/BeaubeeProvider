import { ADDBUSINESSLOCATION_DATA, ADDBUSINESSLOCATION_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function AddBusinessLocationReducer(state = initialState, action) {
  switch (action.type) {
    case ADDBUSINESSLOCATION_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case ADDBUSINESSLOCATION_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}