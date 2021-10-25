import { IComment } from "../../../entities/comment";
import { IPayload } from "../../../interfaces/redux";
import { LOAD_COMMENTS } from "../actions/comments";

const initState = {
  comments: [],
};
export const commentsReducer = (
  state: { comments: IComment[] },
  action: IPayload<IComment[]>
) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      return { comments: action.payload };

    default: {
      return { ...initState, ...state };
    }
  }
};
