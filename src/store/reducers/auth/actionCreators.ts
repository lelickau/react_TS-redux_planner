import axios from "axios";
import { AppDispatch } from "../../index";
import { IUser } from "../../../models/IUser";
import { AuthActionEnum, SetUserAction, SetErrorAction, SetLoadingAction, SetAuthAction } from "./types";

export const AuthAC = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    setLoading: (loading: boolean): SetLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: loading}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),

    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthAC.setLoading(true))
            setTimeout( async() => {
                const response = await axios.get<IUser[]>('./users.json')
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(AuthAC.setUser(mockUser))
                    dispatch(AuthAC.setIsAuth(true))
                } else {
                    dispatch(AuthAC.setError('Некорректный логин или пароль'))
                }
                dispatch(AuthAC.setLoading(false))
            }, 2000)
        } catch (error) {
            dispatch(AuthAC.setError('Произошла ошибка при авторизации пользователя'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthAC.setUser({} as IUser));
        dispatch(AuthAC.setIsAuth(false))
    }
}