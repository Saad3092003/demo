import React from 'react'
import { useState } from 'react'
import { getViewCount, get_buyers_listing_profile } from '../../handleSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';



function ByersCount({lid}) {
    const dispatch = useDispatch();
   
    useEffect(() => {
        const getViewCount = async(lid) =>{
            await dispatch(get_buyers_listing_profile(lid));
        }
        getViewCount(lid);
       
      }, []);
      const buyers = useSelector((state) => state.userDetails.get_buyers_listing_profile);
  

     
  return (
    <div className='d-inline'>
     Buyers - {buyers.length}
    </div>
  )
}

export default ByersCount