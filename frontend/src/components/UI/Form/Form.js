import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from "../../FacebookLogin/FacebookLogin";

const Form = ({
    username,
    password,
    onChanged,
    btnLabel,
    onSubmitted,
    getFieldError,
    displayName,
    onChangeFile,
    register
}) => {
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
            {register ?
                <>
                    <input
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={onChanged}
                        className="Form__fields"
                        placeholder="Enter your Name"
                        id="displayName"
                        required
                    />
                    {
                        getFieldError('displayName')
                        &&
                        <label
                            htmlFor="displayName"
                            className="Form__error-label"
                        >{getFieldError('displayName')}</label>
                    }
                    <input
                        type="file"
                        name="avatar"
                        onChange={onChangeFile}
                        className="Form__fields"
                        placeholder="Enter your avatar"
                        id="avatar"
                        required
                    />
                    {
                        getFieldError('avatar')
                        &&
                        <label
                            htmlFor="avatar"
                            className="Form__error-label"
                        >{getFieldError('avatar')}</label>
                    }
                </> : null
            }
            <button type="submit" className="Form__btn">{btnLabel}</button>
            <p style={{marginBottom: '0px'}}>Or sign in with facebook</p>
            <FacebookLogin btnLabel='Login with facebook' />
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