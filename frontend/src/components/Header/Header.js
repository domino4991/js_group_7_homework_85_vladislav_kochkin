import React, {useState} from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import {AiFillHome} from 'react-icons/ai';
import {urlApi} from "../../constants";

const Header = () => {
    const {user} = useSelector(state => state.users);
    const [show, setShow] = useState(false);
    let path;
    if(user) {
        if(user.avatar !== null && user.avatar.includes('https')) {
            path = user.avatar;
        } else {
            path = urlApi + '/uploads/' + user.avatar;
        }
    } else {
        path = null;
    }

    return (
        <header className="Header">
            <div className="container Header__inner">
                <span className="Logo">Music App</span>
                <nav className="Header__nav">
                    <ul className="Header__nav-list">
                        <li className="Header__nav-item">
                            <NavLink
                                to="/"
                                exact
                                className="Header__nav-link"
                            >
                                <AiFillHome /> Home
                            </NavLink>
                        </li>
                            {
                                !user ?
                                <>
                                    <li className="Header__nav-item">
                                        <NavLink
                                            to="/register"
                                            exact
                                            className="Header__nav-link"
                                        >
                                            Sign up
                                        </NavLink>
                                    </li>
                                    <li className="Header__nav-item">
                                        <NavLink
                                            to="/login"
                                            exact
                                            className="Header__nav-link"
                                        >
                                            Sign in
                                        </NavLink>
                                    </li>
                                </>
                                    :
                                <li
                                    className="Header__nav-item"
                                >
                                    <div
                                        className="Header__dropdown-btn"
                                        onMouseEnter={() => setShow(true)}
                                        onMouseLeave={() => setShow(false)}
                                    >
                                        {user.avatar && <img
                                            src={path}
                                            alt={user.displayName}
                                            className='Header__dropdown__avatar'
                                        />}
                                        <p className="Header__dropdown__user" id='userDisplayName'>{user.displayName}</p>
                                        <DropDownMenu show={show} />
                                    </div>
                                </li>
                            }
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;