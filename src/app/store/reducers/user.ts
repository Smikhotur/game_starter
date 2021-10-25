import { IUserWithID } from "../../../entities/user";
import { IPayload } from "../../../interfaces/redux";
import {
  LOGIN_USER,
  LOGOUT,
  REGISTER_USER,
  UPDATE_USER,
} from "../actions/user";

const initState = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  image: "",
  isAdmin: false,
};

export const userReducer = (
  state: IUserWithID = initState,
  action: IPayload<IUserWithID>
) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return { ...initState };
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      return { ...state };
    }
  }
};
