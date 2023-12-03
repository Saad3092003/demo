
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { edit_listing_profile } from "../../handleSlice";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Editlisting({ item }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadspin, setloadspin] = useState(false);
    const [modalServiceName, setModalServiceName] = useState(item.service_name);
    const [modalServiceArea, setModalServiceArea] = useState(item.service_area);
    const [modalPrice, setModalPrice] = useState(item.price);
    const [modalquantity, setModalQuantity] = useState(item.stock);
    const [modalCategory, setModalCategory] = useState(item.category);
    const categories = useSelector((state) => state.userDetails.AllCategories_mpm)

    const [imagePreviewedit, setImagePreviewedit] = useState([]);

    const [imagePreviewedit1, setImagePreviewedit1] = useState([]);
    const [description, setDescription] = useState(item.description);
    const memData = useSelector((state) => state.userDetails.VeiwMember);
    const mid = localStorage.getItem('mid') || Cookies.get('mid');
    const handleSubmit2 = async (event) => {
        event.preventDefault();
        if (loadspin !== true) {
            setloadspin(true);
            const formData = new FormData();

            formData.append("lid", item.lid);
            formData.append("mid", mid);
            formData.append("service_name", modalServiceName);
            formData.append("service_area", modalServiceArea);
            formData.append("category", modalCategory);
            formData.append("stock", modalquantity);
            formData.append("description", description);
            formData.append("title", modalServiceName);
            formData.append("seller_name", memData.uname)

            formData.append("seller_id", memData.mid);
            formData.append("price", modalPrice)
            if (imagePreviewedit.length > 0) {
                imagePreviewedit.forEach((image, index) => {
                    formData.append("thumbnail_photo", image);
                });
            }
            if (imagePreviewedit1.length > 0) {
                imagePreviewedit1.forEach((image, index) => {
                    formData.append("slider_photos", image);
                });
            }

            await dispatch(edit_listing_profile(formData));
            setloadspin(false);
            window.location.reload()
        }

    };
    const handleImageChangeedit = (e) => {
        const files = Array.from(e.target.files);
        const selectedImages = files.map((file) => file);
        setImagePreviewedit(selectedImages);
    };
    const handleImageChangeedit1 = (event) => {
        const files = event.target.files;
        const uploadedImages = [];

        for (let i = 0; i < files.length; i++) {
            uploadedImages.push(files[i]);
        }
        setImagePreviewedit1(uploadedImages);
    }
    const handleImageRemove = () => {
        // setImagePreview(null);
        setImagePreviewedit([]);
    };
    return (
        <div className="tab-pane active " id="sell" role="tabpanel" aria-labelledby="sell-tab">
            <form >
                <div className='px-lg-4'>
                    <div className="">

                        <h3 className="p-2">Edit Listing</h3>
                        {/* <h3 className="p-4">{item.service_name}</h3>
                        <h3 className="p-4">{item.service_area}</h3> */}
                        <div className="modal-body">
                            <form >
                                <div className='px-lg-4'>



                                    <div className="">
                                        <div className='text-secondary fw-semibold fs-7 border-1 border-bottom'>
                                            Form
                                        </div>
                                        <p className='mb-2'>Service Name</p>
                                        <input type="text" placeholder='Enter your Service Name' className='form-control form-control-lg border-success' value={modalServiceName} onChange={(e) => setModalServiceName(e.target.value)} />
                                        <p className='mt-3 mb-2'> Service Area</p>
                                        <input type="text" placeholder='Enter Service Area ' className='form-control form-control-lg border-success' value={modalServiceArea} onChange={(e) => setModalServiceArea(e.target.value)} />

                                        <p className='mt-3 mb-2'> Price</p>
                                        <input type="number" placeholder='Enter Price' className='form-control form-control-lg border-success' value={modalPrice} onChange={(e) => setModalPrice(e.target.value)} />
                                        <p className='mt-3 mb-2'> Quantity</p>
                                        <input type="number" placeholder='Enter Qunatity' className='form-control form-control-lg border-success' value={modalquantity} onChange={(e) => setModalQuantity(e.target.value)} />

                                        <p className='mt-3 mb-2'>Category</p>
                                        <select type="text" placeholder='Select Your Category' className='form-control form-control-lg border-success' value={modalCategory} onChange={(e) => setModalCategory(e.target.value)} >
                                            {/* <option>Category</option>
                                                   
                                                    <option>BedRoom</option>
                                                    <option>Office</option> */}
                                            <option>Select</option>
                                            {categories.map((item, index) => (
                                                <option value={item.category_name}>{item.category_name}</option>

                                            ))}
                                        </select>
                                        <p className='mt-3 mb-2'>Service Photo</p>
                                        <div className="d-flex gap-2">
                                            < div className='upload-img position-relative border-secondary t3 border'>
                                                <input
                                                    type="file"
                                                    id="imageInputedite"
                                                    style={{ display: 'none' }}
                                                    onChange={handleImageChangeedit}
                                                />
                                                {!imagePreviewedit.length > 0 ? (
                                                    <>
                                                        <label htmlFor='imageInputedite' className='w-100 h-100 place-items-center d-grid cursor-pointer' >
                                                            <AddIcon fontSize="large" />
                                                        </label>
                                                    </>
                                                ) :
                                                    imagePreviewedit.map((image, index) => (

                                                        <>
                                                            <div className='position-absolute top-0 end-0 m-1 bg-danger cursor-pointer' style={{ lineHeight: 0 }} onClick={handleImageRemove}><CloseIcon className='text-white' /></div>
                                                            <img src={URL.createObjectURL(image)} className='img-fluid w-100 h-100 object-fit-cover' />
                                                        </>
                                                    )
                                                    )
                                                }
                                            </div>
                                            {!imagePreviewedit.length > 0 && (
                                                <>
                                                    <img src={item.thumbnail_photo} className="upload-img object-fit-cover" alt={item.service_name} />
                                                </>
                                            )}
                                        </div>
                                        <p className='mt-3 mb-2'>Slider Photo</p>
                                        < div className=' position-relative  t3 border'>
                                            <input
                                                type="file"
                                                id="sldimageInputedite"
                                                onChange={handleImageChangeedit1}
                                                multiple
                                            />
                                            {!imagePreviewedit1.length > 0 ? (
                                                <>
                                                    <label htmlFor='sldimageInputedite' className='w-100 h-100 place-items-center d-grid cursor-pointer' >
                                                    </label>
                                                    <div className='d-flex flex-nowrap overflow-auto gap-2 py-2'>
                                                        {item.slider_photos.map((image, index) => (
                                                            <div key={index} style={{ height: '150px', width: '150px', position: 'relative' }} className='flex-shrink-0'>
                                                                <img key={index} src={image} alt={`Preview ${index}`} className='img-fluid w-100 h-100 object-fit-cover' />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='d-flex flex-nowrap overflow-auto gap-2 py-2'>
                                                    {
                                                        imagePreviewedit1.map((image, index) => (
                                                            <div key={index} style={{ height: '150px', width: '150px', position: 'relative' }} className='flex-shrink-0'>
                                                                <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} className='img-fluid w-100 h-100 object-fit-cover' />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )}

                                        </div>
                                        <p className='mt-3 mb-2'> Description</p>
                                        <textarea type="text" placeholder='Enter Description ' className='form-control form-control-lg border-success' value={description} onChange={(e) => setDescription(e.target.value)} />

                                        <Button className='shadow-none mt-4 text-white px-5 rounded-0' variant='contained' color='themeColor' size='large' onClick={handleSubmit2}>
                                            {loadspin == true ? (
                                                <div className="spinner-border text-white" role="alert"></div>
                                            ) : ("Submit")}
                                        </Button>
                                    </div>

                                </div>
                            </form>



                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Editlisting;