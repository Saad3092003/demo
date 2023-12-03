import React, { useEffect, useState } from "react";
import image from '../404/pngegg.png';
function FourZeroFour({ loadScreen }) {
    loadScreen(false);

    return (
        <div style={{ maxWidth: '40rem' }} className="mx-auto">
            <div className="w-100 h-100 text-center d-flex justify-content-center align-items-center p-5">
                <img src={image} className="img-fluid" alt="" />
            </div>
            <h2 className="text-center">Page not found</h2>
            <h5 className="text-center text-secondary" >The page you are looking for is not there..</h5>
        </div>
    )
}
export default FourZeroFour;