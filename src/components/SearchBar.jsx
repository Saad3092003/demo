import React from "react";
import { Button } from '@mui/material';
import '../assets/css/searchBar.css'
import { useState } from "react";
function SearchBar({ onClick, onInputChange }) {

    const [searchTerm, setSearchTerm] = useState(''); // State to store the input value

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setSearchTerm(newValue);
        onInputChange(newValue); // Pass the input value to the parent component
    };
    return (
        <>
            <div className='container'>
                <div className='search-box rounded-3 bg-white mx-auto' data-aos='fade-up' data-aos-duration='1000'>
                    <div className='row g-3'>
                        <div className="col-md-8 col-lg-10">
                            <div className='input-group rounded px-2 py-1 bg-light2'>
                                <button className='btn'><i className="fa-solid text-secondary fa-magnifying-glass"></i></button>
                                <input type="text" placeholder='Search for anything and everything' className='form-control border-0 form-control-lg bg-light2' value={searchTerm} onChange={handleInputChange} />
                            </div>
                        </div>
                        {/* <div className="col-md-6 col-lg-5">
                            <div className='input-group rounded px-2 py-1 bg-light2'>
                                <button className='btn'><i className="fa-solid text-secondary fa-location-crosshairs"></i></button>
                                <input type="text" placeholder='Locations' className='form-control border-0 form-control-lg bg-light2' />
                            </div>
                        </div> */}
                        <div className="col-md-4 col-lg-2">
                            <Button variant='contained' size='large' color='themeColor' className='text-white shadow-none h-100 w-100' onClick={onClick}>Search</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchBar;