import react, {Children, createContext, useState} from 'react'

export const DataMinorContext = createContext();

export const DataMinorProvider = ({ children }) => {
    const [minorState, setMinorState] = useState();

    return (
        <DataMinorContext.Provider value={{ minorState, setMinorState}}>
            { children }
        </DataMinorContext.Provider>
    )
}