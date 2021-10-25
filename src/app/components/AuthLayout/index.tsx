import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import rocket from "../../static/images/auth/rocket.png";
import logo from "../../static/images/auth/logo.png";
import { ERoutes } from "../../../routes";
import "./styles.scss";

export const AuthLayout: React.FC = ({ children }) => {
  return (
    <div className="auth">
      <div className="auth__leftbar">
        <Link to={ERoutes.home}>
          <img src={logo} alt="Logo" className="auth__logo" />
        </Link>
        <img src={rocket} alt="Rocket" className="auth__rocket" />
        <div>
          <h5 className="auth_leftbar__title">
            <FormattedMessage id="buy" defaultMessage="Buy," />
            <br /> <FormattedMessage id="play" defaultMessage="Play," />
            <br />{" "}
            <FormattedMessage id="left_review" defaultMessage="Left Review!" />
          </h5>
        </div>
      </div>
      <div className="auth__content">{children}</div>
    </div>
  );
};
