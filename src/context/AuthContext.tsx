import { TUser } from "@/lib/types";
import { ReactNode, createContext, useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { VITE_BACKEND_URI } = import.meta.env;

interface IAuthContext {
    loading: boolean;
    isAuthenticated: boolean;
    user: TUser | null;
    login: (user: TUser) => void;
    logout: () => void;
}

type TAuthActions = { type: "LOGIN"; payload: TUser } | { type: "LOGOUT" };

const api = axios.create({
    baseURL: VITE_BACKEND_URI + "/api",
})

const AuthContext = createContext<IAuthContext | null>(null);

const authReducer = (state: IAuthContext, action: TAuthActions): IAuthContext => {
    switch (action.type) {
        case "LOGIN":
            const { token } = action.payload;
            api.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            })
            return { ...state, user: action.payload, isAuthenticated: true}
        case "LOGOUT":
            return { ...state, user: null, isAuthenticated: false}
        default:
            return state;
    }
}

const initialState: IAuthContext = {
    loading: false,
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {}
}

const AuthProvider = ({children}: {children: ReactNode}) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (user: TUser) => {
        dispatch({ type: "LOGIN", payload: user });
    }

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{...state, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth, api };