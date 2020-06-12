import React, {useEffect} from 'react';
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom';
import {getData, addEmployee, editEmployee, deleteEmployee} from './actions';
import {connect} from 'react-redux';
import {useRoutes} from "./routes";
import {AuthActions} from "./reducers/auth";
import {useAuthButton} from "./button.auth";
import 'materialize-css'

const App = (props) => {
    const {isLoading, getData, checkAuthed, token, signOut} = props;
    const authButton = useAuthButton(!!token, signOut)
    const routes = useRoutes(isLoading, authButton)

    useEffect(() => {
        getData()
    }, [getData])

    useEffect(() => {
        checkAuthed()
    }, [token, checkAuthed])

    return (
        <>
            <div className="sticky">
                <div>Made by Seytech students. 2020</div>
            </div>
            <div className="app">
                <Router>
                    {routes}
                </Router>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    employees: state.crudReducers.employees,
    isLoading: state.crudReducers.isLoading,
    sortBy: state.crudReducers.sortBy,
    toggleOrder: state.crudReducers.toggleOrder,
    token: state.auth.token
});

export default connect(mapStateToProps, {
    getData,
    addEmployee,
    editEmployee,
    deleteEmployee,
    checkAuthed: AuthActions.checkAuthed,
    signOut: AuthActions.signOut
})(App);