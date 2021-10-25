import { useState } from "react";
import { useDispatch } from "react-redux";

import { getAuth } from "@firebase/auth";

import { createGame } from "../../app/store/actions/games";

import { FormWrapper } from "../../app/components/FormWrapper";
import { UserAuthValue } from "../../app/components/common/UserAuthValue";
import { createPostFormConfig } from "./consts";

import "./index.scss";

const CreatePost: React.FC = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState<any>({
    name: {
      value: "",
      error: "",
    },
    description: {
      value: "",
      error: "",
    },
    picture: {
      value: "",
      error: "",
    },
    status: {
      value: "",
      error: "",
    },
    genre: {
      value: "",
      error: "",
    },
    rated: {
      value: "",
      error: "",
    },
    price: {
      value: "",
      error: "",
    },
    currency: {
      value: "$",
      error: "",
    },
  });

  const handleChange = (fieldName: string) => (value: string) => {
    const newForm = {
      ...form,
      [fieldName]: { value: value, error: !value },
    };
    setForm(newForm);
  };

  const handleSumbit = () => {
    const auth = getAuth();

    if (!auth.currentUser) {
      return;
    }

    const id = auth.currentUser.uid;

    dispatch(
      createGame({
        name: form.name.value,
        description: form.description.value,
        picture: form.picture.value,
        status: form.status.value,
        genre: form.genre.value,
        rated: form.rated.value,
        price: form.price.value,
        currency: form.currency.value,
        creatorID: id,
        likes: [],
        createdDate: Date.now().toString(),
        comments: [],
      })
    );
  };

  return (
    <div className="create-post">
      <h4 className="create-post__title">Create Post!</h4>
      <FormWrapper handleSumbit={handleSumbit} isValidForm={true}>
        {createPostFormConfig.map((formField: any, index) => {
          return (
            <UserAuthValue
              {...formField}
              handleChange={handleChange(formField.name)}
              error={form[formField.name].error}
              value={form[formField.name].value}
              key={index}
            />
          );
        })}
      </FormWrapper>
    </div>
  );
};

export default CreatePost;
