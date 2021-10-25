/* eslint-disable no-restricted-globals */
/** just for test rigth now */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CardDetails } from "../../app/components/CardDetails/CardDetails";
import { Comments } from "../../app/components/Comments/Comments";
import { RootState } from "../../app/store";
import { loadGameByID } from "../../app/store/actions/games";
import { IGame } from "../../entities/game";
import { ERoutes } from "../../routes";
import "./index.scss";

const Details: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { selectedGame }: { selectedGame: IGame } = useSelector(
    (state: RootState) => state.games
  );
  useState(() => {
    if (!id) {
      location.pathname = ERoutes.home;
      return;
    }
    dispatch(loadGameByID(id));
  });
  return (
    <div className="details">
      <CardDetails gameDetails={selectedGame} />
      <Comments gameDetails={selectedGame} />
    </div>
  );
};

export default Details;
