import { createContext, useState } from "react";

export const UserContext = createContext({
    user: null,
    token: null,
    connectUser: () => {},
    disconnectUser: () => {}
});

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    const connectUser = ({token,user}) => {
        setUser(user);
        setToken(token);
    }

    const disconnectUser = () => {
        setUser(null);
        setToken(null);
    }

    const value = {
        user,
        token,
        connectUser,
        disconnectUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );

}

export const useUser = () => useContext(UserContext);