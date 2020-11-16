import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../store/actions/userActions";
import Form from "../../components/UI/Form/Form";

const Register = () => {
    const {error} = useSelector(state => state.users);

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

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
        dispatch(registerUser({...user}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    return (
        <section className="Register-page">
            <div className="container">
                <h2 className="Title-page">Регистрация</h2>
                <Form
                    password={user.password}
                    btnLabel="Sign up"
                    onSubmitted={(e) => onSubmittedForm(e)}
                    onChanged={e => onFieldsChange(e)}
                    username={user.username}
                    getFieldError={getFieldError}
                />
            </div>
        </section>
    );
};

export default Register;