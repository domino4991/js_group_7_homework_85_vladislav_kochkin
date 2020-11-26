import React from 'react';
import './DropDownMenu.css';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {logoutUser} from "../../../store/actions/userActions";
import {useDispatch, useSelector} from "react-redux";

const DropDownMenu = ({show}) => {
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    let classes = show ? ['DropDownMenu', 'active'] : ['DropDownMenu'];
    let panel = null;

    if(user && user.role === 'admin') {
        panel = (
            <li className="DropDownMenu__nav-item">
                <NavLink
                    to="/admin"
                    className="DropDownMenu__nav-link"
                >
                    Админ-панель
                </NavLink>
            </li>
        );
    } else if(user && user.role === 'user') {
        panel = (
            <li className="DropDownMenu__nav-item">
                <NavLink
                    to="/profile"
                    className="DropDownMenu__nav-link"
                >
                    Профиль
                </NavLink>
            </li>
        );
    }

    return (
        <div className={classes.join(' ')}>
            <nav className="DropDownMenu__nav">
                <ul className="DropDownMenu__nav-list">
                    {panel}
                    <li className="DropDownMenu__nav-item">
                        <NavLink
                            to="/track_history"
                            className="DropDownMenu__nav-link"
                        >
                            История треков
                        </NavLink>
                    </li>
                    <li className="DropDownMenu__nav-item">
                        <NavLink
                            to='/add-new-artist'
                            className="DropDownMenu__nav-link"
                        >
                            Добавить нового исполнителя
                        </NavLink>
                    </li>
                    <li className="DropDownMenu__nav-item">
                        <NavLink
                            to='/add-new-album'
                            className="DropDownMenu__nav-link"
                        >
                            Добавить новый альбом
                        </NavLink>
                    </li>
                    <li className="DropDownMenu__nav-item">
                        <NavLink
                            to='/add-new-track'
                            className="DropDownMenu__nav-link"
                        >
                            Добавить новый трек
                        </NavLink>
                    </li>
                    <li className="DropDownMenu__nav-item">
                        <button
                            className="DropDownMenu__nav-link"
                            onClick={() => dispatch(logoutUser())}
                        >
                            Выйти
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

DropDownMenu.propTypes = {
    show: PropTypes.bool.isRequired
};

export default DropDownMenu;