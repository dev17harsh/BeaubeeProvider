import { UPDATEBUSINESSPASSWORD_DATA, UPDATEBUSINESSPASSWORD_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function UpdateBusinessPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATEBUSINESSPASSWORD_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case UPDATEBUSINESSPASSWORD_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}