import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { Dispatch } from "redux";
import { IComment } from "../../../entities/comment";
import { db } from "../../../firebase";
import { loadGameByID } from "./games";

export const LOAD_COMMENTS: string = "LOAD_COMMENTS";

export const loadCommentsAction = (comments: IComment[]) => ({
  type: LOAD_COMMENTS,
  payload: comments,
});

/** thunk that implements saving commnets */
export const addComment = ({
  gameId,
  prevComments,
  ...comment
}: IComment & { gameId: string; prevComments: number[] }) =>
  async function (dispatch: Dispatch) {
    try {
      const data = await addDoc(collection(db, "comments"), comment);
      await updateDoc(doc(db, "game", gameId), {
        comments: [...prevComments, data.id],
      });
      dispatch(loadGameByID(gameId) as any);
    } catch (error) {
      console.log(error);
    }
  };

/** thunk that implements get commnets */
export const getCommentsByIds = (ids: number[]) =>
  async function (dispatch: Dispatch) {
    try {
      const loaders = ids.map(async (id: number) => {
        const commentSnap = await getDoc(doc(db, "comments", id as any));
        if (!commentSnap.data()) {
          return;
        }
        const comment = commentSnap.data() as IComment;
        const userSnap = await getDoc(doc(db, "user", comment.creatorID));
        return { ...comment, id, creator: userSnap.data() };
      });
      const comments = await Promise.all(loaders);
      const filteredComments: any = comments.filter(Boolean);
      if (!filteredComments) {
        return;
      }
      dispatch(loadCommentsAction(filteredComments as IComment[]));
    } catch (error) {
      console.log(error);
    }
  };

/** thunk that implements delete comments */
export const deleteCommentByID = ({
  id,
  gameId,
}: {
  id: string;
  gameId: string;
}) =>
  async function (dispatch: Dispatch) {
    try {
      await deleteDoc(doc(db, "comments", id));
      dispatch(loadGameByID(gameId) as any);
    } catch (error) {
      console.log(error);
    }
  };
