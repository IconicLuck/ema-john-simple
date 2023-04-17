import React, { createContext } from 'react';


export const AuthContext = createContext(null)

const AuthProviders = ({children}) => {

    const user = {displayName: 'Al Katra'}

    const authInfo = {
        user
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;