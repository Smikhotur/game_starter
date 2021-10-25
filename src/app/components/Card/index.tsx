/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store";
import { IGame } from "../../../entities/game";
import closeIcon from "../../static/images/main/close.png";
import { deleteGameByID } from "../../store/actions/games";
import "./index.scss";
import { IUser } from "../../../entities/user";

export const Card: React.FC<{ card: IGame & { id: string } }> = ({ card }) => {
  const dispatch = useDispatch();
  const { isAdmin }: IUser = useSelector((state: RootState) => state.user);

  const deleteGame = () => {
    dispatch(deleteGameByID(card.id));
  };

  return (
    <div className="card">
      {isAdmin && (
        <div className="card__close">
          <img
            className="card__close__icon"
            src={closeIcon}
            onClick={deleteGame}
          />
        </div>
      )}

      <div
        className="card__image"
        style={{ backgroundImage: `url("${card.picture}")` }}
      />
      <div className="card__text-area">
        <Link to={`details/${card.id}`}>
          <h4 className="card__title">{card.name}</h4>
        </Link>
        <p className="card__description">{card.description}</p>
      </div>
      <div className="card__stats">
        <div className="card__rate">
          <span className="card__rate__title">Rate: </span>
          <span className="card__rate__value">{card.rated}</span>
        </div>
        <div className="card__comments">
          <span className="card__comments__title">Comments: </span>
          <span className="card__comments__value">1000</span>
        </div>
      </div>
      <p className="card__date">
        Created: {new Date(card.createdDate).toLocaleString()}
      </p>
    </div>
  );
};
