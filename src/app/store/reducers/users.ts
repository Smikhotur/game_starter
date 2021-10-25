import { IUser } from "../../../entities/user";
import { IPayload } from "../../../interfaces/redux";
import { GET_USERS } from "../actions/users";

const initState = {
  data: [],
  loading: true,
};

export const usersReducer = (
  state: { users: IUser },
  action: IPayload<IUser[]>
) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return {
        ...initState,
        ...state,
      };
  }
};
