/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch } from "redux";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  FieldPath,
  QueryConstraint,
  addDoc,
  collection,
  doc,
  getDoc,
  deleteDoc,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import { db, firebaseApp } from "../../../firebase";
import { IGame } from "../../../entities/game";
import { ERoutes } from "../../../routes";
import { getCommentsByIds } from "./comments";

export const LOAD_GAMES: string = "LOAD_GAMES";
export const LOAD_SELECTED_GAME: string = "LOAD_SELECTED_GAME";
export const CREATE_GAME: string = "CREATE_GAME";
export const DELETE_GAME: string = "DELETE_GAME";

export const loadGamesAcation = (games: IGame[]) => ({
  type: LOAD_GAMES,
  payload: games,
});
export const createGameAcation = (game: Omit<IGame, "id">) => ({
  type: CREATE_GAME,
  payload: game,
});
export const loadGameAcation = (game: Omit<IGame, "id">) => ({
  type: LOAD_SELECTED_GAME,
  payload: game,
});

const auth = getAuth();

/** thunk that implements user login */
export const loadGames = ({
  page,
  perPage,
  search,
  searchField,
}: {
  page: number;
  perPage: number;
  search: string;
  searchField: string;
}) =>
  async function (dispatch: Dispatch) {
    try {
      const cond = [
        !!search ? where(searchField, ">=", search) : false,
        !!search ? where(searchField, "<=", search + "\uf8ff") : false,
        limit(perPage),
      ].filter(Boolean) as QueryConstraint[];
      const querySnapshot = await getDocs(
        query(collection(db, "game"), ...cond)
      );
      if (querySnapshot.empty) {
        dispatch(loadGamesAcation([]));
      } else {
        const data: IGame[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as IGame);
        });
        dispatch(loadGamesAcation(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

/** thunk that implements create game */
export const createGame = (game: Omit<IGame, "id">) =>
  async function (dispatch: Dispatch) {
    if (!auth.currentUser) {
      return;
    }

    try {
      await setDoc(doc(db, "game", auth.currentUser.uid), game);
      await dispatch(createGameAcation(game));
      location.pathname = ERoutes.home;
    } catch (error) {
      console.log(error);
    }
  };

/** thunk that implements load game by id */
export const loadGameByID = (id: string) =>
  async function (dispatch: Dispatch) {
    try {
      const docSnap = await getDoc(doc(db, "game", id));
      if (docSnap.exists()) {
        const game = docSnap.data() as IGame;
        dispatch(getCommentsByIds(game.comments) as any);
        dispatch(loadGameAcation(game));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteGameByID = (id: string) =>
  async function (dispatch: Dispatch) {
    try {
      await deleteDoc(doc(db, "game", id));
      dispatch(
        loadGames({
          page: 0,
          perPage: 3,
          search: "",
          searchField: "",
        }) as any
      );
    } catch (error) {
      console.log(error);
    }
  };
