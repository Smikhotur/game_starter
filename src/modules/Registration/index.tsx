/** just for test rigth now */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";

import { registerUser } from "../../app/store/actions/user";
import { ERoutes } from "../../routes";
import { UserAuthValue } from "../../app/components/common/UserAuthValue";
import { FormWrapper } from "../../app/components/FormWrapper";
import { registrationFormConfig } from "./consts";

import "./index.scss";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<any>({
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    firstName: {
      value: "",
      error: false,
    },
    lastName: {
      value: "",
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
      registerUser({
        image: form.image.value,
        email: form.email.value,
        password: form.password.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        isAdmin: false,
      })
    );
  };

  const { formatMessage } = useIntl();
  const list = registrationFormConfig(formatMessage);

  return (
    <section className="registration">
      <h3 className="registration__sign-up">Become a member</h3>
      <FormWrapper handleSumbit={handleSumbit} isValidForm={true}>
        {list.map((authValue: any) => {
          return (
            <UserAuthValue
              {...authValue}
              handleChange={handleChange(authValue.name)}
              value={form[authValue.name].value}
              error={form[authValue.name].error}
            />
          );
        })}
      </FormWrapper>
      <div>
        <div>
          <p>
            <FormattedMessage
              id="already_registred"
              defaultMessage="Already registred?"
            />{" "}
            <Link to={ERoutes.login} className="sign-in__link">
              <FormattedMessage id="sign_in" defaultMessage="Sign In" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
