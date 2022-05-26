import React, { createContext, userReducer } from 'react';
import { InitialState,userReducer } from '../reducers/UserReducer';

export const UserContext = createContext();

export default ({children}) => {
    return (
        <UserContext.Provider>
            {children}
        </UserContext.Provider>
    );
}
