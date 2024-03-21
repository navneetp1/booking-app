import React, { useContext, useState } from "react";

type SearchContext = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    childCount: number;
    adultCount: number;
    hotelId: string;
    saveSearchValues:(
        destination: string,
        checkIn: Date,
        checkOut: Date,
        childCount: number,
        adultCount: number
    ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

export const SearchContextProvider = ({ children }:{ children: React.ReactNode }) => {
    
    //added later.. storing(getting items here) info in session storage to prevent reload reset
    const [destination, setDestination] = useState<string>(
        ()=> sessionStorage.getItem("destination") || ""
        );

    const [checkIn, setCheckIn] = useState<Date>(
        () => 
            new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
    const [checkOut, setCheckOut] = useState<Date>(
        () => 
            new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
    const [childCount, setChildCount] = useState<number>(
        () => parseInt(sessionStorage.getItem("childCount") || "0"));
    const [adultCount, setAdultCount] = useState<number>(
        () => parseInt(sessionStorage.getItem("adultCount") || "1")
    );
    const [hotelId, setHotelId] = useState<string>(
        () => sessionStorage.getItem("hotelId") || ""
    );
    
    const saveSearchValues = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        childCount: number,
        adultCount: number,
        hotelId?: string
    ) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setChildCount(childCount);
        setAdultCount(adultCount);
        if(hotelId){
             setHotelId(hotelId);
        }

        sessionStorage.setItem("destination", destination);
        sessionStorage.setItem("checkIn",checkIn.toISOString());
        sessionStorage.setItem("checkOut",checkOut.toISOString());
        sessionStorage.setItem("adultCount",adultCount.toString());
        sessionStorage.setItem("childCount",childCount.toString());

        //saving to session storage
        if(hotelId){
            sessionStorage.setItem("hotelId",hotelId); 
        }
        

    };


    return (
        <SearchContext.Provider value={{
            destination,
            checkIn,
            checkOut,
            childCount,
            adultCount,
            saveSearchValues,
            hotelId,
        }}>
            {children}
        </SearchContext.Provider>
    )
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
}