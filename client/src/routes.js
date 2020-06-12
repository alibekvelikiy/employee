import React from "react";
import {Switch} from "react-router";
import {Redirect, Route} from "react-router-dom";
import Search from "./components/search/Search";
import Employee from "./components/employee/Employee";
import AddEmployee from "./components/addemployee/AddEmployee";
import List from "./components/list/List";
import Loader from "./components/common/Loader/Loader";
import AuthContainer from "./components/auth/AuthContainer";

export const useRoutes = (isLoading, authButton) => {
    // if loaded render List
    let content = isLoading ? <Loader/> : <List />;
    return (
        <Switch>
            <Route exact path='/'>
                <Redirect to="/page/1" />
            </Route>
            <Route path='/page/:page'>
                {authButton}
                <Search />
                {content}
            </Route>
            <Route path='/employee/:id'>
                <Employee />
            </Route>
            <Route exact path='/new-employee/'>
                <AddEmployee />
            </Route>
            <Route path='/auth'>
                <AuthContainer />
            </Route>
        </Switch>
    )
}