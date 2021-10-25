import { FormattedMessage } from "react-intl";
import { Nav } from "../Nav";

import "./index.scss";

export const Header = () => (
  <header className="header">
    <div className="header__wrapper">
      <Nav />
      <div className="header__text-area">
        <h1 className="header__title">
          <FormattedMessage id="best_game" defaultMessage="Best gamers here!" />
        </h1>
        <p className="header__description">
          <FormattedMessage
            id="best_ecosystem"
            defaultMessage="Best ecosystem to review and share game expirience."
          />
        </p>
      </div>
    </div>
  </header>
);
