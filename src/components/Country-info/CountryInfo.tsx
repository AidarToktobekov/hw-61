import { useEffect, useState } from "react";

interface Props{
    name: string;
    capital: string;
    borders: string[];
    flags: {png: string}
    population: string;
}

const CountryInfo:React.FC<Props> = ({name , capital ,borders ,flags , population })=>{
    let countryInfoAlert = (
        <>
            Select a country to see information
        </>);
    const URLcountryCode = 'https://restcountries.com/v2/alpha/';
    let countriesInfo: string[];
    let setCountriesInfo: any;
    [countriesInfo , setCountriesInfo] = useState([]);

    if(name !== ''){
        countryInfoAlert = (
            <>
            <h4>{name}</h4>
                <span className="d-block fw-bold text-start">
                    Capital: {capital}
                </span>
                <span className="d-block fw-bold text-start">
                <span className="d-block fw-bold text-start">
                    Population - { population}
                </span>
                    Borders: {countriesInfo.map((country, index)=>{
                    
                        return(
                            <span className="d-block fw-normal text-start" key={index}>{index + 1}. {country}</span>
                        )
                    })}
                </span>
                <img src={flags.png} className="border mt-2" alt="Flag" />
            </>
        )
    }
    

    
    useEffect(()=>{
        const getBorders =async()=>{
            if (borders !== undefined) {
                if (borders.length > 1) {
                    const countryCopy:string[] = [];
                    for (let i = 0; i < borders.length; i++) {
                        const response = await fetch(URLcountryCode + borders[i]);
                        
                        if (response.ok) {
                            const responseCountry = await response.json();
                            countryCopy.push(responseCountry.name);
                        }
                        else{   
                            throw new Error('Something went wrong with network request');
                        }
                    }
                    setCountriesInfo(countryCopy);
                    console.log(countryCopy); 
                }
            }
            if (borders === undefined) {
                setCountriesInfo(['no bordering countries']);
            }
        }
        void getBorders()
    },[borders])

    return(
        <>
        <div className="ms-4 border p-5">
            <h3 className="mb-3 fw-bold">
                Info
            </h3>
            {countryInfoAlert}
        </div>
        </>
    )
}

export default CountryInfo