/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { useDispatch, useSelector } from "react-redux";
import logo from "../../static/images/nav/logo.png";
import { Cross, DropdownNavBar } from "../../static/images/nav/svg";
import { logoutUser } from "../../store/actions/user";
import { changeLocal } from "../../store/actions/local";
import { ERoutes } from "../../../routes";
import { RootState } from "../../store";
import { SocialList } from "./consts";

import "./index.scss";

export const Nav = () => {
    const dispatch = useDispatch();
    const { email, firstName, image } = useSelector(
        (state: RootState) => state.user
    );
    const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
    const [userControls, handleControls] = useState<boolean>(false);

    const handleLogout = () => {
        dispatch(logoutUser());
    };
    const { lang } = useSelector((state: RootState) => state.local);

    const handleChangeLang = () => {
        if (lang === "en") {
            dispatch(changeLocal("ru"));
        } else {
            dispatch(changeLocal("en"));
        }
    };

    return (
        <nav className="nav">
            <Link to="/">
                <img className="nav__logo" src={logo} alt="logo" />
            </Link>
            <div className="nav__wrapper">
                <div className="nav__controls">
                    <ul className="nav__list">
                        {SocialList.map((item, index) => (
                            <li className="nav__item" key={index}>
                                <a href={item.path} className="nav__link">
                                    <img className="nav__icon" src={item.icon} alt="" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`nav__controls-mobile${dropdownMenu ? "-active" : ""}`}>
                    <ul className="nav__list-mobile">
                        {SocialList.map((item, index) => (
                            <li className="nav__item" key={index}>
                                <a href={item.path} className="nav__link">
                                    <img className="nav__icon" src={item.icon} alt="" />
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="" className="nav__button-mobile">
                        <FormattedMessage id="login" defaultMessage="Login" />
                    </a>
                    <a href="" className="nav__button-mobile">
                        <FormattedMessage id="register" defaultMessage="Register" />
                    </a>
                </div>
                {!email ? (
                    <>
                        <Link to={ERoutes.login} className="nav__button">
                            <FormattedMessage id="login" defaultMessage="Login" />
                        </Link>
                        <Link to={ERoutes.registration} className="nav__button">
                            <FormattedMessage id="register" defaultMessage="Register" />
                        </Link>
                    </>
                ) : (
                    <div className="nav__status">
                        <span className="nav__status__name">Welcome, {firstName}</span>
                        <div
                            className="nav__status__user"
                            onClick={() => handleControls((prev) => !prev)}
                        >
                            {userControls && (
                                <div className="nav__status__user-controls">
                                    <div className="nav__status__logout" onClick={handleLogout}>
                                        Logout
                                    </div>
                                    <Link className="nav__status__logout" to={ERoutes.edit}>
                                        Edit profile
                                    </Link>
                                    <Link className="nav__status__logout" to={ERoutes.home}>
                                        Go to home
                                    </Link>
                                    <Link className="nav__status__logout" to={ERoutes.create}>
                                        Create post
                                    </Link>
                                </div>
                            )}
                            <img
                                className="nav__status__user__profile"
                                alt="profile"
                                src={image}
                            />
                        </div>
                    </div>
                )}
                <div
                    className="nav__dropdown"
                    onClick={() => setDropdownMenu(!dropdownMenu)}
                >
                    {dropdownMenu ? <Cross /> : <DropdownNavBar />}
                </div>
                <select
                    className="nav__language"
                    onChange={handleChangeLang}
                    value={lang}
                >
                    <option value="en">ENG</option>
                    <option value="ru">RU</option>
                </select>
            </div>
        </nav>
    );
};
