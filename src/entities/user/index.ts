/** fireabase  user */
export interface IUser {
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export interface IUserWithPassword extends IUser {
  password: string;
}

export interface IUserWithID extends IUser {
  id: string;
}
