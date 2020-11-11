import React from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";

const Header = () => {
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
                                Home
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;