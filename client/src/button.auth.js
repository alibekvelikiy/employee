import React from "react";
import {NavLink} from "react-router-dom";

export const useAuthButton = (isAuthorized, signOut) => (
    <div>
        {isAuthorized
            ? <button onClick={signOut} className="btn">Sign out</button>
            : <NavLink to="/auth"> <button className="btn btn-green">Sign in</button> </NavLink>
        }
    </div>
)