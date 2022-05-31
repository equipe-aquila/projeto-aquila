import React, { createContext, userReducer } from 'react';
import { initialState,UserReducer } from '../reducers/UserReducer';

export const UserContext = createContext();

export default ({children}) => {
    const [state,dispach] = userReducer(UserReducer,initialState)
    return (
        <UserContext.Provider>
            {children}
        </UserContext.Provider>
    );
}
