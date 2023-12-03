import React from 'react'
import { useState } from 'react'
import { getViewCount } from '../../handleSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { url4 } from '../port';



function Count({pid}) {
    const dispatch = useDispatch();
    const [viewCount, setViewCount] = useState(0);
    useEffect(() => {
        const getViewCount = async(pid) =>{
            try {
                // const response = await axios.get(`http://139.59.236.50:8080/api/view_Product?pid=${pid}`, {
                //     headers: {
                //         "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                //     },
                const response = await axios({
                    method: "get",
                    url: `${url4}/api/view_Product?pid=${pid}`,
                   
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    },
                });
                console.log(response);
                console.log(response);
                // dispatch(getCart(mid));
                setViewCount(response.data.viewCount);
                return response.data.viewCount;
            }
            catch (error) {
                console.log(error);
            }
        }
        getViewCount(pid);
       
      }, []);

  

     
  return (
    <div className='d-inline'>
     {viewCount}
    </div>
  )
}

export default Count