import react, {Children, createContext, useState} from 'react'

export const DataIdContext = createContext();

export const DataIdProvider = ({ children }) => {
    const [idCourse, setIdCourse] = useState();

    return (
        <DataIdContext.Provider value={{ idCourse, setIdCourse}}>
            { children }
        </DataIdContext.Provider>
    )
}