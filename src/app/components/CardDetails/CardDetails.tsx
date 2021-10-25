/* eslint-disable jsx-a11y/img-redundant-alt */
import { FC } from "react";
import { FormattedMessage } from "react-intl";
import commentImg from "../../static/images/main/comment.png";
import { IGame } from "../../../entities/game";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IComment } from "../../../entities/comment";

import "./index.scss";

export const CardDetails: FC<{ gameDetails: IGame }> = ({ gameDetails }) => {
  const { comments }: { comments: IComment[] } = useSelector(
    (state: RootState) => state.comments
  );

  return (
    <section className="details__description description">
      <img
        src={gameDetails.picture}
        alt="game image"
        className="description__img"
      />
      <div className="description__inner">
        <div className="description__desc-inner">
          <h3 className="description__name">{gameDetails.name}</h3>
          <div className="description__desc">{gameDetails.description}</div>
        </div>

        <div className="description__box-comments">
          <div>
            <FormattedMessage id="price" defaultMessage="Price: " />
            {gameDetails.price} {gameDetails.currency}
          </div>
          <div className="description__rate">
            <FormattedMessage id="rate" defaultMessage="Rate: " />
            {gameDetails.rated} / 10
          </div>
          <div className="description__comments">
            <img src={commentImg} alt="" />
            <FormattedMessage id="comment" defaultMessage="Comments: " />
            {comments.length}
          </div>
        </div>
      </div>
    </section>
  );
};
