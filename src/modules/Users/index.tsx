/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IUserWithID } from "../../entities/user";
import { deleteUserById, getUsers } from "../../app/store/actions/users";
import closeIcon from "../../app/static/images/main/close.png";

import "./index.scss";

export const Users = () => {
  const { data }: { data: IUserWithID[] } = useSelector(
    (state: RootState) => state.users
  );
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteUser = (id: string) => () => {
    dispatch(deleteUserById(id));
  };

  if (!user.isAdmin) {
    return <h1>YOU DON'T HAVE ACCESS</h1>;
  }
  return (
    <section className="users">
      <div className="users__wrapper">
        <ul className="users__list">
          {data.map((user: IUserWithID, index: number) => (
            <li className="users__item" key={index}>
              <span>{user.email}</span>
              <div className="users__item__close">
                <img
                  className="users__item__close__icon"
                  src={closeIcon}
                  onClick={deleteUser(user.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Users;
