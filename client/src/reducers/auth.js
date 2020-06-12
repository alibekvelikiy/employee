import {AuthAPI} from "../actions/auth.api";

const storageName = "user-data"

const ActionTypes = class {
    static setIsAuth = "SET-IS-AUTH"
    static setIsLoading = "SET-IS-LOADING"
    static setErrors = "SET-ERRORS"
    static setToken = "SET-TOKEN"
    static setUserId = "SET-USER-ID"
}

const initialState = {
    isAuth: false,
    isLoading: false,
    errors: null,
    token: null,
    userId: null
}

const reducerBranches = {
    [ActionTypes.setIsAuth]: (state, action) => ({...state, isAuth: action.isAuth}),
    [ActionTypes.setUserId]: (state, action) => ({...state, userId: action.userId}),
    [ActionTypes.setIsLoading]: (state, action) => ({...state, isLoading: action.isLoading}),
    [ActionTypes.setErrors]: (state, action) => ({...state, errors: action.errors}),
    [ActionTypes.setToken]: (state, action) => ({...state, token: action.token})
}

const authReducer = (state = initialState, action) => {
    const reducer = reducerBranches[action.type]
    return reducer ? reducer(state, action) : state
}

export const AuthActions = class {
    static setIsAuth = isAuth => ({type: ActionTypes.setIsAuth, isAuth})
    static setIsLoading = isLoading => ({type: ActionTypes.setIsLoading, isLoading})
    static setErrors = errors => ({type: ActionTypes.setErrors, errors})
    static setToken = token => ({type: ActionTypes.setToken, token})
    static setUserId = userId => ({type: ActionTypes.setUserId, userId})

    static signUp = payload => async dispatch => {
        dispatch(this.setIsLoading(true))
        try {
            await AuthAPI.sighUp(payload)
            dispatch(this.setIsLoading(false))
        } catch (e) {
            dispatch(this.setIsLoading(false))
            dispatch(this.setErrors(e.message))
        }
    }
    static signIn = payload => async dispatch => {
        dispatch(this.setIsLoading(true))
        try {
            const data = await AuthAPI.signIn(payload)
            if (!data && !data.token) {
                throw new Error(data.message || "Sign in Error")
            }
            dispatch(this.setToken(data.token))
            dispatch(this.setIsAuth(true))
            dispatch(this.setUserId(data.userId))
            dispatch(this.setIsLoading(false))

            localStorage.setItem(storageName, JSON.stringify({token: data.token, userId: data.userId}))
        } catch (e) {
            dispatch(this.setIsLoading(false))
            dispatch(this.setErrors(e.message))
        }
    }
    static checkAuthed = () => async dispatch => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            dispatch(this.setToken(data.token))
            dispatch(this.setUserId(data.userId))
            dispatch(this.setIsAuth(true))
        }
    }

    static signOut = () => async dispatch => {
        dispatch(this.setIsAuth(false))
        dispatch(this.setToken(null))
        dispatch(this.setUserId(null))
        localStorage.removeItem(storageName)
    }
}

export default authReducer