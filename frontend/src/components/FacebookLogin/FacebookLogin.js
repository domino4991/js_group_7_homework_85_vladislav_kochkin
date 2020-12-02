import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {facebookAccess} from "../../constants";
import {useDispatch} from "react-redux";
import {facebookLogin} from "../../store/actions/userActions";

const FacebookLogin = ({btnLabel}) => {
    const dispatch = useDispatch();
    const facebookResponse = response => {
        if(response.id) {
            dispatch(facebookLogin(response));
        }
    };

    return (
        <FacebookLoginButton
            appId={facebookAccess}
            fields='name,email,picture'
            render={renderProps => {
                return <button
                    onClick={renderProps.onClick}
                    className='Form__btn'
                    type="button"
                >{btnLabel}</button>
            }}
            callback={facebookResponse}
        />
    );
};

export default FacebookLogin;