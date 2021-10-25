import cs from "classnames";
import { getBase64 } from "../../../../utils/file";
import "./styles.scss";

export const UserAuthValue: React.FC<{
  value: string;
  placeHolder: string;
  type: string;
  handleChange: (value: string) => void;
  error: string;
  accept?: string;
}> = ({ value, placeHolder, type, handleChange, error, accept }) => {
  const onChange = async (e: any) => {
    if (type === "file") {
      const base64File = await getBase64(e.target.files[0]);
      handleChange(base64File);
      return;
    }

    handleChange(e.target.value);
  };
  return (
    <>
      <input
        className={cs(error && "input__error", "auth__input")}
        value={type === "file" ? undefined : value}
        placeholder={placeHolder}
        type={type}
        onChange={onChange}
        accept={accept}
      />
      {error && <span className="error__message">Field is required!</span>}
    </>
  );
};
