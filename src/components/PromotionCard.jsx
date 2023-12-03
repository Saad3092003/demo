import React, { useState, useEffect } from 'react';
import { pink } from '@mui/material/colors';

import { Button, Checkbox } from '@mui/material';
import '../assets/css/MarketPlaceCard.css';

function PromotionCard() {

    const [sliderContent, setSliderContent] = useState([]);

    // in this below UseEffect function the data will be fetched using api,
    // so we dont need to manually type data, i have just writen hard code for sample data
    useEffect(() => {
        setSliderContent([
            {
                rating: 4.5,
                img: 'https://i.pinimg.com/originals/62/43/e7/6243e7c35d594c05d6178cc74ca895f8.jpg',
                descp: 'lorem ipsum dolor sit amit constructror',
                cost: 123,
                dateAgo: 12,
                profileImg: 'https://cdn2.f-cdn.com/files/download/40990929/88eaef.jpg',
                profileName: 'Alex',
                profileReveiws: 23
            },
            {
                rating: 4.5,
                img: 'https://th.bing.com/th/id/OIP.4hy_hgjhkHUpHrYnki2cOgHaFj?pid=ImgDet&rs=1',
                descp: 'lorem ipsum dolor sit amit constructror',
                cost: 123,
                dateAgo: 12,
                profileImg: 'https://cdn2.f-cdn.com/files/download/40990929/88eaef.jpg',
                profileName: 'Micheal',
                profileReveiws: 23
            },
            {
                rating: 4.5,
                img: 'https://i.pinimg.com/originals/62/43/e7/6243e7c35d594c05d6178cc74ca895f8.jpg',
                descp: 'lorem ipsum dolor sit amit constructror',
                cost: 123,
                dateAgo: 12,
                profileImg: 'https://cdn2.f-cdn.com/files/download/40990929/88eaef.jpg',
                profileName: 'Doe',
                profileReveiws: 23
            },
            {
                rating: 4.5,
                img: 'https://th.bing.com/th/id/OIP.4hy_hgjhkHUpHrYnki2cOgHaFj?pid=ImgDet&rs=1',
                descp: 'lorem ipsum dolor sit amit constructror',
                cost: 123,
                dateAgo: 12,
                profileImg: 'https://cdn2.f-cdn.com/files/download/40990929/88eaef.jpg',
                profileName: 'Jesica',
                profileReveiws: 23
            }
        ]);
    }, []);

    return (

        <div className='row g-4'>
            {sliderContent.map((item, index) => (
                <div key={index} data-aos='fade-up' data-aos-duration='700' data-aos-delay={(index % 4) * 200} className='col-lg-4 col-md-6 col-xxl-3'>
                    <div className='slider-card promotion-slider bg-white border'>
                        <div className='img-box'>
                            <img src={item.img} alt="" />
                            <div className='d-flex w-100 justify-content-between hover-hide position-absolute p-3 top-0 start-0'>
                                <div>
                                    <button className='btn btn-sm rounded-pill'>{item.rating} <i className="fa-solid fa-star text-white"></i> </button>
                                </div>
                                <div>
                                    <Checkbox icon={<i className="fa-solid fa-heart "></i>} checkedIcon={<i className="fa-solid fa-heart"></i>} sx={{
                                        color: 'white',
                                        backgroundColor: 'grey',
                                        '&.Mui-checked': {
                                            backgroundColor: pink[600],
                                            color: 'white',
                                        },
                                    }} />
                                </div>
                            </div>
                            <div className='promotion-signin'>

                                <Button variant='contained' color='themeColor' className='text-white rounded-0 shadow-none px-5' size='large'>signin</Button>

                            </div>
                        </div>
                        <div className='sliderContent p-2'>
                            <p>{item.descp}</p>
                            <div className='mt-2 d-flex justify-content-between align-items-center'>
                                <div className='text-danger fs-5'>
                                    <span>S$ </span><span>{item.cost}</span>
                                </div>
                                <div className='text-secondary '>
                                    {item.dateAgo} days ago
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex mx-3 gap-2 align-items-center sliderProfile mt-2'>
                        <div><img src={item.profileImg} alt={item.profileName} /></div>
                        <div className='lh-sm'>
                            {item.profileName}
                            <span className='text-secondary'>{item.profileReveiws} Reviews</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default PromotionCard;
