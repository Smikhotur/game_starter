import { IGame } from "../../../entities/game";
import { IPayload } from "../../../interfaces/redux";
import { LOAD_GAMES, LOAD_SELECTED_GAME } from "../actions/games";

const initState = {
  data: [],
  selectedGame: {},
};

export const gamesReducer = (
  state: { games: IGame[] | IGame },
  action: IPayload<IGame[]>
) => {
  switch (action.type) {
    case LOAD_GAMES:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case LOAD_SELECTED_GAME:
      return {
        ...state,
        selectedGame: action.payload,
      };
    default: {
      return { ...initState, ...state };
    }
  }
};
