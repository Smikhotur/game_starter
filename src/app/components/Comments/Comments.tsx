/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IGame } from "../../../entities/game";
import { RootState } from "../../store";
import { addComment, deleteCommentByID } from "../../store/actions/comments";

import closeIcon from "../../static/images/main/close.png";

import "./styles.scss";
import { IComment } from "../../../entities/comment";
import { IUserWithID } from "../../../entities/user";

export const Comments: React.FC<{ gameDetails: IGame }> = ({ gameDetails }) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [description, setDescription] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const { isAdmin } = useSelector((state: RootState) => state.user);
  const { comments }: { comments: IComment<IUserWithID>[] } = useSelector(
    (state: RootState) => state.comments
  );

  const deleteGame = (_commentID: string) => () => {
    dispatch(deleteCommentByID({ id: _commentID, gameId: id }));
  };

  const handleSubmitComment = () => {
    dispatch(
      addComment({
        gameId: id,
        prevComments: gameDetails.comments || [],
        description,
        creatorID: user.id,
        createdDate: new Date().getDate(),
      })
    );
  };

  const handleChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };
  return (
    <section className="details__comments comments">
      <div className="comments__list">
        {comments.map((comment) => (
          <div className="comments__item">
            {isAdmin && (
              <div className="comments__item__close">
                <img 
                  className="comments__item__close__icon"
                  src={closeIcon}
                  onClick={deleteGame(comment.id as string)}
                />
              </div>
            )}
            <p>
              [{comment?.creator?.lastName} {comment?.creator?.firstName}]:{" "}
              {comment.description}
            </p>
            <p>
              <FormattedMessage id="date" defaultMessage="Date:" />{" "}
              <FormattedDate
                value={comment.createdDate}
                dateStyle="long"
                timeStyle="long"
              />
            </p>
          </div>
        ))}
      </div>
      {user.id ? (
        <>
          <textarea
            className="comments__textarea"
            placeholder="your comment"
            rows={8}
            onChange={handleChangeDescription}
            value={description}
          />
          <div onClick={handleSubmitComment} className="comments__add">
            Left comment
          </div>
        </>
      ) : (
        <div className="comments__no-access">
          <FormattedMessage
            id="pleaseLoginComment"
            defaultMessage="Please login to let a comment"
          />
        </div>
      )}
    </section>
  );
};
