import { Dispatch } from "redux";

export const CHANGE_LOCAL: string = "CHANGE_LOCAL";

export const changeLocalAction = (local: string) => ({
  type: CHANGE_LOCAL,
  payload: local,
});

/** thunk that implements changeng location */
export const changeLocal = (local: string) =>
  async function (dispatch: Dispatch) {
    try {
      localStorage.setItem("local", local);
      dispatch(changeLocalAction(local));
    } catch (error) {
      console.log(error);
    }
  };
