// context/CurrencyContext.js
import React, {createContext, useState, useContext, useEffect} from "react";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const API_KEY = "0929174c27f142d3bf9015013e798a03"; // Replace with your API key
const BASE_URL = "https://openexchangerates.org/api";

export const CurrencyProvider = ({children}) => {
    const [currency, setCurrency] = useState("IDR");
    const [rates, setRates] = useState({}); // New state for storing rates

    const fetchExchangeRates = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/latest.json?app_id=${API_KEY}&base=IDR`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch exchange rates");
            }
            const data = await response.json();
            setRates(data.rates);
        } catch (error) {
            console.error(error);
            // Handle errors or set a fallback state as needed
        }
    };

    useEffect(() => {
        fetchExchangeRates();
    }, [currency]); // Fetch rates when currency changes

    useEffect(() => {
        const storedCurrency =
            typeof window !== "undefined"
                ? localStorage.getItem("currency")
                : "IDR";
        if (storedCurrency) {
            setCurrency(storedCurrency);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("currency", currency);
        }
    }, [currency]);

    return (
        <CurrencyContext.Provider value={{currency, setCurrency, rates}}>
            {children}
        </CurrencyContext.Provider>
    );
};
