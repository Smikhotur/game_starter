import { IPayload } from "../../../interfaces/redux";
import { CHANGE_LOCAL } from "../actions/local";

const initState = { lang: "en" };

export const localReducer = (
  state: { lang: string },
  action: IPayload<string>
) => {
  switch (action.type) {
    case CHANGE_LOCAL:
      return { lang: action.payload };

    default: {
      return { ...initState, ...state };
    }
  }
};
