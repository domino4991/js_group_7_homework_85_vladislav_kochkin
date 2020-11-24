import React from 'react';
import PropTypes from 'prop-types';

const Form = ({username, password, onChanged, btnLabel, onSubmitted, getFieldError}) => {
    return (
        <form className="Form" onSubmit={onSubmitted}>
            <input
                type="text"
                name="username"
                value={username}
                onChange={onChanged}
                className="Form__fields"
                placeholder="Enter your username"
                id="username"
                required
            />
            {
                getFieldError('username')
                    &&
                <label
                    htmlFor="username"
                    className="Form__error-label"
                >{getFieldError('username')}</label>
            }
            <input
                type="password"
                name="password"
                value={password}
                onChange={onChanged}
                className="Form__fields"
                placeholder="Enter your password"
                id="password"
                required
            />
            {
                getFieldError('password')
                    &&
                <label
                    htmlFor="password"
                    className="Form__error-label"
                >{getFieldError('password')}</label>
            }
            <button type="submit" className="Form__btn">{btnLabel}</button>
        </form>
    );
};

Form.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChanged: PropTypes.func.isRequired,
    btnLabel: PropTypes.string.isRequired,
    onSubmitted: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired
};

export default Form;