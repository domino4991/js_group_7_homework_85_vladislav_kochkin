import React, {useState} from 'react';
import Form from "../../components/UI/Form/Form";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/actions/userActions";
import './Login.css';

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const {error} = useSelector(state => state.users);
    const dispatch = useDispatch();

    const onFieldsChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmittedForm = (e) => {
        e.preventDefault();
        dispatch(loginUser({...user}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    return (
        <section className="Login-page">
            <div className="container">
                <h2 className="Title-page">Авторизация</h2>
                {error && <p className="Login-page__error">{error}</p>}
                <Form
                    onSubmitted={e => onSubmittedForm(e)}
                    getFieldError={getFieldError}
                    btnLabel="Sign in"
                    username={user.username}
                    password={user.password}
                    onChanged={e => onFieldsChange(e)}
                />
            </div>
        </section>
    );
};

export default Login;