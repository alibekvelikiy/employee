import React, {useEffect} from "react";
import {connect} from "react-redux";
import Auth from "./Auth";
import {compose} from "redux";
import {withRouter} from "react-router";
import {AuthActions} from "../../reducers/auth";
import {useMessage} from "../common/hooks/message.hook";

const AuthContainer = props => {
    const message = useMessage()
    const {signUp, signIn, history, isAuth, errors} = props;

    const onLoginHandler = ({email, password}) => {
        signIn({email, password})
    }
    const onAuthHandler = ({email, password}) => {
        signUp({email, password})
    }

    useEffect(() => {
        if (isAuth) {
            history.push('/')
        }
    }, [isAuth, history])

    useEffect(() => {
        message(errors)
    }, [errors, message])

    const goBack = () => history.goBack()

    return (
        <Auth {...props}
              onLoginHandler={onLoginHandler}
              onAuthHandler={onAuthHandler}
              goBack={goBack}
        />
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading,
    errors: state.auth.errors,
})

export default compose(
    connect(mapStateToProps, {
        signUp: AuthActions.signUp,
        signIn: AuthActions.signIn,
    }),
    withRouter
)(AuthContainer)