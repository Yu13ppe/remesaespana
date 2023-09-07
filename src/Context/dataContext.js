import { createContext, useContext } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";

export const DataContext = createContext();

export function DataContextProvider(props) {
    const [accessToken, setAccessToken] = useLocalStorage("token", '');
    const [logged, setLogged] = useLocalStorage('log', false);
    const [currencyPrice, setCurrencyPrice] = useLocalStorage('currency', []);
    const value = {
        logged, setLogged, 
        accessToken, setAccessToken,
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