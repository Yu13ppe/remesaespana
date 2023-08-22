import { createContext, useContext } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";

export const DataContext = createContext();

export function DataContextProvider(props) {
    const [verifyData, setVerifyData] = useLocalStorage('verif', false);
    const [logged, setLogged] = useLocalStorage('log', false);
    const [isAdmin, setIsAdmin] = useLocalStorage('adm', false);
    const [user, setUser] = useLocalStorage('user',[]);
    const [currencyPrice, setCurrencyPrice] = useLocalStorage('currency', []);
    const value = {
        verifyData, setVerifyData, 
        logged, setLogged, 
        isAdmin, setIsAdmin, 
        user, setUser,
        currencyPrice, setCurrencyPrice
    };

    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    );
}

export function useDataContext() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataContextProvider');
    }
    return context;
}