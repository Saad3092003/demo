import React, { useEffect } from "react";
import '../../assets/css/account.css';
import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Cookies from "js-cookie";
import { url3 } from "../port";


function ChangePassword({ setActiveTab }) {
   
   const [currentPass , setCurrPass] = useState('');
   const [newPassword , setNewPassword] = useState('');
   const [confirmPass , setConfirmPass] = useState('');
   const[ result , setResult] = useState(false);
   const [resultr, setResultr] = useState("");

   const mid = Cookies.get('mid') || localStorage.getItem('mid');

   const handleSubmit = async ( event )=>{
    
    event.preventDefault();
    const mid = localStorage.getItem('mid') || Cookies.get('mid');
    const formData = new FormData();

    formData.append("mid", mid);
    formData.append("current_pwd", currentPass );
    formData.append("update_pwd", newPassword);
    formData.append("cfm_updated_pwd", confirmPass);
   

    try {
        const response = await axios({
            method: "put",
            url: `${url3}/update_password_crm`,
            data: formData,
            // headers: {
            //     "Content-Type": "application/json",
            // },
        })
            .then(async (response) => {
              
                
                setResultr("Edited Successfully");
                setResult('success');
                console.log(response)
               
            })
    }
    catch (err) {
        console.log(err.response.data.msg);
        
        setResult(true);
        setResultr(err.response.data.msg);
        console.log(resultr);
        

    };

   

}
useEffect(() => {
    if (result == true) {
        let login = document.getElementById('EPass');
        setTimeout(() => {
            login.style.transition = '0.5s';
            login.style.opacity = '0';
            login.style.scale = '0.9';
        }, 2000);
        setTimeout(() => {
            login.style.display = 'none';
            setResult(false)
        }, 3500);
    }
    if (result == 'success') {
        let login = document.getElementById('SPass');
        setTimeout(() => {
            login.style.transition = '0.5s';
            login.style.opacity = '0';
            login.style.scale = '0.9';
        }, 2000);
        setTimeout(() => {
            login.style.display = 'none';
            setResult(false)
        }, 3500);
    }

}, [result])


    return (
        <>
         {
                result == true ? (<>
                    <div style={{ zIndex: '9999' }} id="EPass" className="alert m-5 Lalert alert-danger position-fixed end-0 top-0 alert-dismissible fade show" role="alert">
                        <strong>Opps !</strong>&ensp; {resultr}
                    </div>
                </>) : (<>
                </>)
            }
            {
                result == 'success' ? (<>
                    <div style={{ zIndex: '9999' }} id="SPass" className="alert m-5 Lalert border-0 shadow-sm alert-success position-fixed end-0 top-0 alert-dismissible fade show" role="alert">
                        {resultr}
                    </div>
                </>) : (<>
                </>)
            }
        <div className='shadow rounded p-3 bg-white'>
            
          
           
            <div className="mt-4">
                
                <form onSubmit={handleSubmit}>
                   
                    <div className="">
                        <div className='text-secondary fw-semibold fs-7 border-1 border-bottom'>
                    Change Password
                        </div>
                        <p className='mb-2'>Current Password</p>
                        <input type="password" placeholder='Current Password' className='form-control form-control-lg border-success' value={currentPass} onChange={(e)=> setCurrPass(e.target.value)}/>
                        <p className='mt-3 mb-2'>New Password</p>
                        <input type="password" placeholder='New Password' className='form-control form-control-lg border-success' value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}/>
                        <p className='mt-3 mb-2'>Confirm Password</p>
                        <input type="password" placeholder='Confirm Password' className='form-control form-control-lg border-success' value={confirmPass} onChange={(e)=> setConfirmPass(e.target.value)} />
                        


                       
                     
                      
                        <Button className='shadow-none mt-4 text-white px-5 rounded-0' variant='contained' color='themeColor' size='large' onClick={handleSubmit}>Save</Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default ChangePassword;