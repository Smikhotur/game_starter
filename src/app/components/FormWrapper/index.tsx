import cs from "classnames";
import { useIntl } from "react-intl";

import "./styles.scss";

export const FormWrapper: React.FC<{
  handleSumbit: () => void;
  isValidForm: boolean;
}> = ({ children, handleSumbit, isValidForm }) => {
  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSumbit();
  };
  const { formatMessage } = useIntl();

  return (
    <form className="login__form" onSubmit={onSubmit}>
      {children}
      <input
        className={cs("login__submit", isValidForm && "login__submit-valid")}
        value={formatMessage({ id: "valueSubmit", defaultMessage: "submit" })}
        type="submit"
      />
    </form>
  );
};
