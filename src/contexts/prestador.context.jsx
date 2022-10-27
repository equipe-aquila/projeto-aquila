import { createContext, useState } from "react";


export const PrestadorContext = createContext({});

export const PrestadorProvider = ({children}) => {
    const [selectedPrestador, setSelectedPrestador] = useState(null);
    
    const value = {selectedPrestador, setSelectedPrestador}

    return (
        <PrestadorContext.Provider value={value}>
            {children}
        </PrestadorContext.Provider>
    );
} 
