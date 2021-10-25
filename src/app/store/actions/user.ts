/* eslint-disable no-restricted-globals */
import { Dispatch } from "redux";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, firebaseAuth } from "../../../firebase";
import { IUser, IUserWithID, IUserWithPassword } from "../../../entities/user";

export const REGISTER_USER: string = "REGISTER_USER";
export const LOGIN_USER: string = "LOGIN_USER";
export const IS_LOGINED: string = "IS_LOGINED";
export const LOGOUT: string = "LOGOUT";
export const UPDATE_USER: string = "UPDATE_USER";

export const register = (user: IUserWithID) => ({
  type: REGISTER_USER,
  payload: user,
});

export const login = (user: { email: string; password: string }) => ({
  type: LOGIN_USER,
  payload: user,
});

export const update = (
  user: Pick<IUser, "firstName" | "lastName" | "image">
) => ({
  type: UPDATE_USER,
  payload: user,
});

export const isLogined = (isLogined: boolean) => ({
  type: IS_LOGINED,
  payload: isLogined,
});

export const logout = () => ({
  type: LOGOUT,
});

const auth = getAuth();
/** thunk that implements user registration */
export const registerUser = (user: IUserWithPassword) =>
  async function (dispatch: Dispatch) {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);

      if (!auth.currentUser) {
        console.log("error");
        return;
      }

      await setDoc(doc(db, "user", auth.currentUser.uid), {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        id: auth.currentUser.uid,
        comments: [],
        favourites: [],
      });
      dispatch(register({ ...user, id: auth.currentUser.uid }));
      location.pathname = "/";
    } catch (error) {
      console.log(error);
    }
  };

export const getUserInfo = (id?: string) =>
  async function (dispatch: Dispatch) {
    try {
      if (!id) {
        return;
      }
      const docSnap = await getDoc(doc(db, "user", id));
      if (docSnap.exists()) {
        dispatch(login({ ...(docSnap.data() as any), id }));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const loginUser = (user: { email: string; password: string }) =>
  async function (dispatch: Dispatch) {
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      if (!auth.currentUser) {
        console.log("error");
        return;
      }

      const docSnap = await getDoc(doc(db, "user", auth.currentUser.uid));
      if (!docSnap.exists()) {
        return;
      }
      // doc.data() will be undefined in this case
      console.log("No such document!");

      dispatch(login({ ...docSnap.data, ...user }));
      location.pathname = "/";
    } catch (error) {
      console.log(error);
    }
  };

export const logoutUser = () =>
  async function (dispatch: Dispatch) {
    try {
      await firebaseAuth.signOut();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

export const updateUser = (
  user: Pick<IUser, "firstName" | "lastName" | "image">
) =>
  async function (dispatch: Dispatch) {
    try {
      if (!auth.currentUser) {
        return;
      }
      const docRef = doc(db, "user", auth.currentUser.uid);

      await updateDoc(docRef, {
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      });

      dispatch(update(user));
    } catch (error) {
      console.log(error);
    }
  };
