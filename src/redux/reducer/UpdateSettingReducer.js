import { UPDATESETTINGS_DATA, UPDATESETTINGS_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function UpdateSettingReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATESETTINGS_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case UPDATESETTINGS_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}