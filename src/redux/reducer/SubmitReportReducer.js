import { SUBMITREPORT_DATA, SUBMITREPORT_ERROR } from "../type";


const initialState = {
  response: null,
  addUser: false,
};

export function SubmitReportReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMITREPORT_DATA:
      return {
        ...state,
        addUser: true,
        response: action.payload,
      };
    case SUBMITREPORT_ERROR:
      return {
        ...state,
        addUser: false,
        response: action.payload,
      };

    default:
      return state;
  }
}