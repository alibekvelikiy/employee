import React from "react";
import {reduxForm} from "redux-form";
import {minLength, required} from "../../utils/validateForm";
import s from './Auth.module.css'
import {createField, Input} from "../common/FormsControl/FormsControl";

const minLength6 = minLength(6)

const Auth = ({onLoginHandler, onAuthHandler, goBack}) => (
    <div className={s.authBlock}>
        <button className="btn" onClick={goBack}>Go Back</button>
        <div>
            <h1>Login</h1>
            <div>
                <LoginReduxForm onSubmit={onLoginHandler}/>
            </div>
        </div>

        <div>
            <h2>First time here?</h2>
            <h6>Then let's create account for you</h6>
            <div>
                <AuthReduxForm onSubmit={onAuthHandler}/>
            </div>
        </div>
    </div>
)

const LoginForm = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        {createField("Enter email", "email", [required], Input, "text")}
        {createField("Enter password", "password", [required, minLength6], Input, "password")}

        <div>
            <button className="btn green">Login</button>
        </div>
    </form>
)

const AuthForm = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        {createField("Enter email", "email", [required], Input, "text")}
        {createField("Enter password", "password", [required, minLength6], Input, "password")}

        <div>
            <button className="btn">Authorize</button>
        </div>
    </form>
)

const LoginReduxForm = reduxForm({form: "login-form"})(LoginForm)
const AuthReduxForm = reduxForm({form: "auth-form"})(AuthForm)

export default Auth