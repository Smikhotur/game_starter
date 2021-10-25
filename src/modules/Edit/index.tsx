import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormWrapper } from "../../app/components/FormWrapper";
import { UserAuthValue } from "../../app/components/common/UserAuthValue";

import { RootState } from "../../app/store";
import { updateUser } from "../../app/store/actions/user";
import { editProfileFormConfig } from "./consts";

import "./index.scss";

const Edit: React.FC = () => {
  const dispatch = useDispatch();
  const { email, firstName, lastName, image } = useSelector(
    (state: RootState) => state.user
  );
  const [isShowChangeField, setIsChangeShowField] = useState<boolean>(false);

  const changeProfile = () => {
    setIsChangeShowField((prev) => !prev);
  };

  const [form, setForm] = useState<any>({
    firstName: {
      value: firstName,
      error: false,
    },
    lastName: {
      value: lastName,
      error: false,
    },
    image: {
      value: "",
      error: false,
    },
  });

  const handleChange = (fieldName: string) => (value: string) => {
    const newForm = { ...form, [fieldName]: { value, error: !value } };
    setForm(newForm);
  };

  const handleSumbit = () => {
    dispatch(
      updateUser({
        image: form.image.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
      })
    );
  };
  return (
    <section className="edit">
      <h1 className="edit__title">Edit Your Profile</h1>
      <div className="edit__profile">
        <div className="edit__profile__information">
          {!isShowChangeField && (
            <>
              <div>
                Email
                <span>{email}</span>
              </div>
              <div>
                FirstName
                <span>{firstName}</span>
              </div>
              <div>
                LastName
                <span>{lastName}</span>
              </div>
              <input
                className="edit__profile__information__back"
                value="Edit profile"
                type="button"
                onClick={changeProfile}
              />
            </>
          )}
          {isShowChangeField && (
            <FormWrapper handleSumbit={handleSumbit} isValidForm={true}>
              {editProfileFormConfig.map((authValue: any) => {
                return (
                  <UserAuthValue
                    {...authValue}
                    handleChange={handleChange(authValue.name)}
                    value={form[authValue.name].value}
                    error={form[authValue.name].error}
                  />
                );
              })}
              <input
                className="edit__profile__back"
                value="Back to profile"
                type="button"
                onClick={changeProfile}
              />
            </FormWrapper>
          )}
        </div>
        <img className="edit__profile__picture" src={image} alt="profile" />
      </div>
    </section>
  );
};

export default Edit;
