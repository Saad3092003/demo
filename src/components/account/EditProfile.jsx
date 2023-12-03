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
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";

import dayjs from "dayjs";
import { url3 } from "../port";


function EditProfile({ setActiveTab, setalertStatus, setalertText, setalertmode }) {
    const memData = useSelector((state) => state.userDetails.LoggedMember);
    const dateString = memData.birth_date;
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log(memData);

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    const [imagePreview, setImagePreview] = useState(memData.pic_url);
    const [selectDate, setSelectDate] = useState();
    const [fname, setFname] = useState(memData.fname);
    const [lname, setLname] = useState(memData.lname);
    const [address, setAddress] = useState(memData.address);
    const [bio, setBio] = useState(memData.bio);
    const [email, setEmail] = useState(memData.email);
    const [phn, setPhn] = useState(memData.phn);
    const [gender, setGender] = useState(memData.gender);
    const [username, setusername] = useState(memData.uname);
    const [country, setCountry] = useState(memData.country);
    const [zip, setZip] = useState(memData.zipcode);
    console.log(selectDate);
    const mid = Cookies.get('mid') || localStorage.getItem('mid');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImagePreview(file);
    };
    const handleImageUpload = (event) => {
        const files = event.target.files;
        const uploadedImages = [];
        for (let i = 0; i < 1; i++) {
            uploadedImages.push(files[i]);
        }
        setImagePreview(uploadedImages);
    };

    const handleImageRemove = () => {
        setImagePreview(null);
    };
    const handleSelectDateChange = (date) => {
        setSelectDate(date);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const mid = localStorage.getItem('mid') || Cookies.get('mid');
        const formData = new FormData();

        formData.append("pic_url", imagePreview);
        formData.append("uname", username);
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("bio", bio);
        formData.append("phn", phn);
        formData.append("gender", gender);
        formData.append("mid", mid);
        formData.append("country", country);
        formData.append("zipcode", zip);

        try {
            const response = await axios({
                method: "put",
                url: `${url3}/edit_member_details_crm`,
                data: formData,
                // headers: {
                //     "Content-Type": "application/json",
                // },
            })
                .then(async (response) => {


                    setalertText("Edited Successfully");
                    setalertStatus(true);
                    setalertmode('success');
                    console.log(response);

                })
            window.location.reload();
        }
        catch (err) {
            console.log(err);

            setalertStatus(true);
            setalertText(err.response.data.msg);
            setalertmode('error')

        };




    }

    return (
        <>
            <div className='shadow rounded p-3 bg-white'>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-between border-bottom border-1 p-3'>
                        <div className='text-secondary fw-semibold fs-7'>
                            Edit Profile
                        </div>
                        <div className='text-pill fw-semibold fs-7 cursor-pointer activet' onClick={() => setActiveTab('changePassword')} id='editclick' >
                            Change Password
                        </div>
                    </div>
                    <div className='text-secondary fw-semibold fs-7 mt-2'>
                        Profile Photo
                    </div>
                    <div className="d-flex gap-2 gap-md-4 flex-wrap">

                        <div className='pfp'>

                            <input
                                type="file"
                                id="newimageInput"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            {!imagePreview ? (
                                <div className='w-100 h-100 place-items-center d-grid cursor-pointer' >
                                    <AddIcon fontSize='large' />
                                </div>
                            ) : (
                                <>

                                    <img src={imagePreview} className='img-fluid w-100 h-100 object-fit-cover' />
                                </>
                            )}
                        </div>
                        <div className='flex-grow-1 align-self-center'>
                            {!imagePreview ? (
                                <>
                                    <div className='text-secondary mt-2'>Clear frontal face photos are an important way for buyers and sellers to learn about each other</div>
                                    <Button className='shadow-none mt-4 text-white px-5 rounded-0 position-relative' variant='contained' color='themeColor' size='large'><label htmlFor="newimageInput" className="stretched-link"> Upload A Photo </label></Button>
                                </>
                            ) : (
                                <>
                                    <div className='text-secondary mt-2'>Clear frontal face photos are an important way for buyers and sellers to learn about each other</div>
                                    <Button className='shadow-none mt-4 text-white px-5 rounded-0' variant='contained' color='themeColor' size='large' onClick={handleImageRemove}>Remove Photo</Button>
                                </>
                            )}


                        </div>

                    </div>
                    <div className="mt-4">
                        <div className='text-secondary fw-semibold fs-7'>
                            Location Information
                        </div>

                        <div className=" border-top border-1 mb-5">

                            <p className='mb-2'>Username</p>
                            <input type="text" placeholder='Enter your Username' className='form-control form-control-lg border-success' value={username} onChange={(e) => setusername(e.target.value)} />
                            <p className='mt-3 mb-2'>First Name</p>
                            <input type="text" placeholder='Enter First Name' className='form-control form-control-lg border-success' value={fname} onChange={(e) => setFname(e.target.value)} />
                            <p className='mt-3 mb-2'>Last Name</p>
                            <input type="text" placeholder='Enter Last Name' className='form-control form-control-lg border-success' value={lname} onChange={(e) => setLname(e.target.value)} />
                            <p className='mt-3 mb-2'>Address</p>
                            <input type="text" placeholder='Enter Address' className='form-control form-control-lg border-success' value={address} onChange={(e) => setAddress(e.target.value)} />
                            <p className='mt-3 mb-2'>Country</p>
                            <input type="text" placeholder='Enter Country' className='form-control form-control-lg border-success' value={country} onChange={(e) => setCountry(e.target.value)} />
                            <p className='mt-3 mb-2'>Zip Code</p>
                            <input type="text" placeholder='Enter Zip Code' className='form-control form-control-lg border-success' value={zip} onChange={(e) => setZip(e.target.value)} />
                            <p className='mt-3 mb-2'>Bio</p>
                            <textarea type="text" placeholder='Enter Bio' className='form-control form-control-lg border-success' value={bio} onChange={(e) => setBio(e.target.value)} />
                        </div>
                        <div className="">
                            <div className='text-secondary fw-semibold fs-7 border-1 border-bottom'>
                                Private Information
                            </div>
                            <p className='mb-2'>Email</p>
                            <input type="email" placeholder='Enter your Email' className='form-control form-control-lg border-success' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <p className='mt-3 mb-2'>Mobile No.</p>
                            <input type="number" placeholder='Enter Mobile Number' className='form-control form-control-lg border-success' value={phn} onChange={(e) => setPhn(e.target.value)} />
                            <div className='text-pill fw-semibold fs-7 cursor-pointer activet d-flex' id='editclick' >
                                <div className="align-self-end"> UPDATE PHONE</div>
                            </div>

                            <p className='mt-3 mb-2'>Gender</p>
                            <select type="text" placeholder='Select Your Gender' className='form-control form-control-lg border-success' value={gender} onChange={(e) => setGender(e.target.value)}   >
                                <option>Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                            <Button className='shadow-none mt-4 text-white px-5 rounded-0' variant='contained' color='themeColor' size='large' onClick={handleSubmit}>Submit</Button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}
export default EditProfile;