import { collection, getDocs, query, deleteDoc, doc } from '@firebase/firestore';
import { Dispatch } from 'redux';
import { IUser } from '../../../entities/user';
import { db } from '../../../firebase';

export const DELETE_USER = 'DELETE_USER';
export const GET_USERS: string = 'GET_USERS';

export const deleteUser = (user: IUser) => ({
    type: DELETE_USER,
    email: user.email,
});

export const users = (users: IUser[]) => ({
    type: GET_USERS,
    payload: users,
});

export const deleteUserById = (id: string) =>
    async function (dispatch: Dispatch) {
        try {
            await deleteDoc(doc(db, "user", id));
            const querySnapshot = await getDocs(
                query(collection(db, 'user'))
            );
            if (querySnapshot.empty) {
                dispatch(users([]));
            } else {
                const data: IUser[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ ...doc.data() } as IUser);
                });
                dispatch(users(data));
            }
        } catch (error) {
            console.log(error);
        }
    };

export const getUsers = () => async function (dispatch: Dispatch) {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'user')));
        if (querySnapshot.empty) {
            dispatch(users([]));
        } else {
            const data: IUser[] = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data() } as any);
            });
            dispatch(users(data));
        }
    } catch (error) {
        console.log(error);
    }
}
