import React, { useState, useEffect } from "react";
import Offer from "./Offer";
import HomeServiceCard from "./HomeServiceCard";
import electricalimg from './images/account-bg.png'
import selectall from './images/offer-bg.png'
import '../assets/css/HomeService.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShowcaseCard from "./ShowcaseCard";
import { useLocation } from "react-router-dom";
import MarketPlaceCard from "./MarketPlaceCard";


function Category({ loadScreen, categoryDetails, productDetails, pageSize, pageName }) {

    // let pageName = pageName;
    let homeServiceDetails = productDetails;
    // console.log(homeServiceDetails);
    const category = categoryDetails;
    // console.log(category);
    // console.log(category);
    const [activeTab, setactiveTab] = useState('all');
    // console.log(activeTab);
    const handleActiveTabChange = (no) => {
        setactiveTab(no)
    }
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    let pageCount = 2;
    // const paginatedData = pageSize
    //     ? homeServiceDetails.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    //     : homeServiceDetails;

    // const pageCount = pageSize ? Math.ceil(homeServiceDetails.length / pageSize) : 1;



    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const location = useLocation();
    const index = location.state?.index;
    // console.log(location.state);
    useEffect(() => {
        if (pageName == 'SM') {
            const targetIndex = category.findIndex(category => category.ctg_name === index);
            setactiveTab(targetIndex);
        }
        if (pageName == 'MPM') {
            if (index) {
                const targetIndex = category.findIndex(category => category.category_name === index);
                setactiveTab(targetIndex);
            }
        }
    }, [category, index, pageName]);
    // loadScreen(false)
    if (pageName == 'HSM') {
        return (
            <>

                <div className='container pb-5 pt-4'>
                    <div className="d-flex justify-content-between flex-wrap align-items-end">
                        <div><h3>Category</h3></div>

                    </div>
                    <div className="d-flex  gap-3 my-3 mb-4 py-2 overflow-auto theme-scroll">
                        <div data-aos='zoom-in'  >
                            <div onClick={() => handleActiveTabChange('all')} className={`d-flex cursor-pointer px-2 activet t flex-column gap-1 HSM-cat text-center text-capitalize align-items-center ${activeTab == 'all' && ('tag')}`}>
                                <div className="HSM-cat-box t3 bg-light">
                                    <img src={selectall} alt="all"  className="img-fluid w-100 " style={{ scale: '1.5' }} />
                                </div>
                                <div >
                                    All
                                </div >
                            </div>
                        </div>
                        {

                            category ? category.map((items, index) => (
                                <div key={index} data-aos='zoom-in' data-aos-delay={(index) * 100} >
                                    <div onClick={() => handleActiveTabChange(index)} className={`d-flex cursor-pointer px-2 activet t flex-column gap-1 HSM-cat ${index == activeTab && ('tag')} text-center text-capitalize align-items-center`}>
                                        <div className="HSM-cat-box t3">
                                            <img src={items.photos} alt={items.category_name} className="img-fluid w-100"  />
                                        </div>
                                        <div >
                                            {items.category_name}
                                        </div >
                                    </div>
                                </div>
                            )) : (<h2>No Data Passed</h2>)
                        }
                    </div>
                    {category.map((items, index) => (
                        activeTab === index && (
                            <>
                                <div key={index}>
                                    <HomeServiceCard Selcategory={category[activeTab].category_name} details={homeServiceDetails} />

                                </div>
                            </>
                        )


                    ))


                    }
                    {activeTab === 'all' && (
                        <>
                            <div >
                                <HomeServiceCard details={homeServiceDetails} />
                            </div>
                        </>
                    )
                    }
                </div >
                {pageSize && (
                    <div className="pagination absolute left-0 right-0 flex justify-end p-5 gap-3">
                        <button
                            className={`px-4 border-2 rounded-md ${currentPage === 0
                                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                                : "bg-white text-gray-700 "
                                }`}
                            disabled={currentPage === 0}
                            onClick={handlePreviousPage}>
                            {"<"} Prev
                        </button>
                        <span className="px-4 py-2">{`${currentPage + 1
                            } - ${pageCount}`}</span>
                        <button
                            className={`px-4 border-2 rounded-md ${currentPage === pageCount - 1
                                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                                : "bg-white text-gray-700"
                                }`}
                            disabled={currentPage === pageCount - 1}
                            onClick={handleNextPage}>
                            Next {">"}
                        </button>
                    </div>
                )}
                <Offer />

            </>
        )
    } else if (pageName == 'SM') {
        return (
            <>

                <div className='container pb-5 pt-4'>
                    <div className="d-flex justify-content-between flex-wrap align-items-end">
                        <div><h3>Category</h3></div>

                    </div>
                    <div className="d-flex  gap-3 my-3 mb-4 py-2 overflow-auto theme-scroll">
                        <div data-aos='zoom-in'  >
                            <div onClick={() => handleActiveTabChange('all')} className={`d-flex cursor-pointer px-2 activet t flex-column gap-1 HSM-cat text-center text-capitalize align-items-center ${activeTab == 'all' && ('tag')}`}>
                                <div className="HSM-cat-box t3 bg-light">
                                    <img src={selectall} alt="all" className="img-fluid w-100 " style={{ scale: '1.5' }} />
                                </div>
                                <div >
                                    All
                                </div >
                            </div>
                        </div>
                        {

                            category ? category.map((items, index) => (
                                <div key={index} data-aos='zoom-in' data-aos-delay={(index) * 100} >
                                    <div onClick={() => handleActiveTabChange(index)} className={`d-flex cursor-pointer px-2 activet t flex-column gap-1 HSM-cat ${index == activeTab && ('tag')} text-center text-capitalize align-items-center`}>
                                        <div className="HSM-cat-box t3">
                                            <img src={items.ctg_photo} className="img-fluid w-100" alt={items.ctg_name} />
                                        </div>
                                        <div >
                                            {items.ctg_name}
                                        </div >
                                    </div>
                                </div>
                            )) : (<h2>No Data Passed</h2>)
                        }
                    </div>
                    {category.map((items, index) => (
                        activeTab === index && (
                            <>
                                <div key={index}>

                                    <ShowcaseCard selectCategory={category[activeTab].ctg_name} sliderContent={homeServiceDetails.filter(item => item.category === category[activeTab].cid)} />

                                </div>
                            </>
                        )


                    ))


                    }
                    {activeTab === 'all' && (
                        <>
                            <div >
                                <ShowcaseCard sliderContent={homeServiceDetails} />
                            </div>
                        </>
                    )
                    }
                </div >
                {pageSize && (
                    <div className="pagination absolute left-0 right-0 flex justify-end p-5 gap-3">
                        <button
                            className={`px-4 border-2 rounded-md ${currentPage === 0
                                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                                : "bg-white text-gray-700 "
                                }`}
                            disabled={currentPage === 0}
                            onClick={handlePreviousPage}>
                            {"<"} Prev
                        </button>
                        <span className="px-4 py-2">{`${currentPage + 1
                            } - ${pageCount}`}</span>
                        <button
                            className={`px-4 border-2 rounded-md ${currentPage === pageCount - 1
                                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                                : "bg-white text-gray-700"
                                }`}
                            disabled={currentPage === pageCount - 1}
                            onClick={handleNextPage}>
                            Next {">"}
                        </button>
                    </div>
                )}
                <Offer />

            </>
        )
    } else if (pageName == 'MPM') {
        return (
            <>

                <div className='container pb-5 pt-4'>
                    <div className="d-flex justify-content-between flex-wrap align-items-end">
                        <div><h3>Category</h3></div>

                    </div>
                    <div className="d-flex  gap-3 my-3 mb-4 py-2 overflow-auto theme-scroll">
                        <div data-aos='zoom-in'  >
                            <div onClick={() => handleActiveTabChange('all')} className={`d-flex cursor-pointer px-2 activet t flex-column gap-1 HSM-cat text-center text-capitalize align-items-center ${activeTab == 'all' && ('tag')}`}>
                                <div className="HSM-cat-box t3 bg-light">
                                    <img src={selectall} className="img-fluid w-100 " style={{ scale: '1.5' }} alt="all" />
                                </div>
                                <div >
                                    All
                                </div >
                            </div>
                        </div>
                        {

                            category ? category.map((items, index) => (
                                <div key={index} data-aos='zoom-in' data-aos-delay={(index) * 100} >
                                    <div onClick={() => handleActiveTabChange(index)} className={`d-flex cursor-pointer px-2 activet t flex-column gap-1 HSM-cat ${index == activeTab && ('tag')} text-center text-capitalize align-items-center`}>
                                        <div className="HSM-cat-box t3">
                                            <img src={items.category_icon} className="img-fluid w-100" alt={items.category_name} />
                                        </div>
                                        <div >
                                            {items.category_name}
                                        </div >
                                    </div>
                                </div>
                            )) : (<h2>No Data Passed</h2>)
                        }
                    </div>
                    {category.map((items, index) => (
                        activeTab === index && (
                            <>
                                <div key={index}>

                                    <MarketPlaceCard selectCategory={category[activeTab].category_name} sliderContent={homeServiceDetails.filter(item => item.category === category[activeTab].category_name)} />

                                </div>
                            </>
                        )


                    ))


                    }
                    {activeTab === 'all' && (
                        <>
                            <div >
                                <MarketPlaceCard sliderContent={homeServiceDetails} />
                            </div>
                        </>
                    )
                    }
                </div >
                {pageSize && (
                    <div className="pagination absolute left-0 right-0 flex justify-end p-5 gap-3">
                        <button
                            className={`px-4 border-2 rounded-md ${currentPage === 0
                                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                                : "bg-white text-gray-700 "
                                }`}
                            disabled={currentPage === 0}
                            onClick={handlePreviousPage}>
                            {"<"} Prev
                        </button>
                        <span className="px-4 py-2">{`${currentPage + 1
                            } - ${pageCount}`}</span>
                        <button
                            className={`px-4 border-2 rounded-md ${currentPage === pageCount - 1
                                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                                : "bg-white text-gray-700"
                                }`}
                            disabled={currentPage === pageCount - 1}
                            onClick={handleNextPage}>
                            Next {">"}
                        </button>
                    </div>
                )}
                <Offer />

            </>
        )
    }
    else if (pageName == 'Prodcat') {
        return (
            <>

                <div className='container pb-5 pt-4'>
                    <div className="d-flex justify-content-between flex-wrap align-items-end">
                        <div><h3> Product Category</h3></div>

                    </div>
                    <div className="d-flex  gap-3 my-3 mb-4 py-2 overflow-auto theme-scroll">
                        <div data-aos='zoom-in'  >
                            <div onClick={() => handleActiveTabChange('all')} className={`d-flex cursor-pointer px-2 activet t flex-column gap-1 HSM-cat text-center text-capitalize align-items-center ${activeTab == 'all' && ('tag')}`}>
                                <div className="HSM-cat-box t3 bg-light">
                                    <img src={selectall} className="img-fluid w-100 " style={{ scale: '1.5' }} alt="all" />
                                </div>
                                <div >
                                    All
                                </div >
                            </div>
                        </div>
                        {

                            category ? category.map((items, index) => (
                                <div key={index} data-aos='zoom-in' data-aos-delay={(index) * 100} >
                                    <div onClick={() => handleActiveTabChange(index)} className={`d-flex cursor-pointer px-2 activet t flex-column gap-1 HSM-cat ${index == activeTab && ('tag')} text-center text-capitalize align-items-center`}>
                                        <div className="HSM-cat-box t3">
                                            <img src={items?.photos[0]} className="img-fluid w-100" alt={items.category_name} />
                                        </div>
                                        <div >
                                            {items.category_name}
                                        </div >
                                    </div>
                                </div>
                            )) : (<h2>No Data Passed</h2>)
                        }
                    </div>
                    {category.map((items, index) => (
                        activeTab === index && (
                            <>
                                <div key={index}>
                                    <HomeServiceCard Selcategory={category[activeTab].category_name} details={homeServiceDetails.filter(item => item.product_category === category[activeTab].pcid)} />

                                </div>
                            </>
                        )


                    ))


                    }
                    {activeTab === 'all' && (
                        <>
                            <div >
                                <HomeServiceCard details={homeServiceDetails} />
                            </div>
                        </>
                    )
                    }
                </div >
                {pageSize && (
                    <div className="pagination absolute left-0 right-0 flex justify-end p-5 gap-3">
                        <button
                            className={`px-4 border-2 rounded-md ${currentPage === 0
                                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                                : "bg-white text-gray-700 "
                                }`}
                            disabled={currentPage === 0}
                            onClick={handlePreviousPage}>
                            {"<"} Prev
                        </button>
                        <span className="px-4 py-2">{`${currentPage + 1
                            } - ${pageCount}`}</span>
                        <button
                            className={`px-4 border-2 rounded-md ${currentPage === pageCount - 1
                                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                                : "bg-white text-gray-700"
                                }`}
                            disabled={currentPage === pageCount - 1}
                            onClick={handleNextPage}>
                            Next {">"}
                        </button>
                    </div>
                )}
                <Offer />

            </>
        )
    }
    else if (pageName == 'Servcat') {
        return (
            <>

                <div className='container pb-5 pt-4'>
                    <div className="d-flex justify-content-between flex-wrap align-items-end">
                        <div><h3> Service Category</h3></div>

                    </div>
                    <div className="d-flex  gap-3 my-3 mb-4 py-2 overflow-auto theme-scroll">
                        <div data-aos='zoom-in'  >
                            <div onClick={() => handleActiveTabChange('all')} className={`d-flex cursor-pointer px-2 activet t flex-column gap-1 HSM-cat text-center text-capitalize align-items-center ${activeTab == 'all' && ('tag')}`}>
                                <div className="HSM-cat-box t3 bg-light">
                                    <img src={selectall} className="img-fluid w-100 " style={{ scale: '1.5' }} alt="all" />
                                </div>
                                <div >
                                    All
                                </div >
                            </div>
                        </div>
                        {

                            category ? category.map((items, index) => (
                                <div key={index} data-aos='zoom-in' data-aos-delay={(index) * 100} >
                                    <div onClick={() => handleActiveTabChange(index)} className={`d-flex cursor-pointer px-2 activet t flex-column gap-1 HSM-cat ${index == activeTab && ('tag')} text-center text-capitalize align-items-center`}>
                                        <div className="HSM-cat-box t3">
                                            <img src={items?.photos[0]} className="img-fluid w-100" alt={items.category_name} />
                                        </div>
                                        <div >
                                            {items.category_name}
                                        </div >
                                    </div>
                                </div>
                            )) : (<h2>No Data Passed</h2>)
                        }
                    </div>
                    {category.map((items, index) => (
                        activeTab === index && (
                            <>
                                <div key={index}>
                                    <HomeServiceCard Selcategory={category[activeTab].category_name} details={homeServiceDetails.filter(item => item.service_category === category[activeTab].scid)} />

                                </div>
                            </>
                        )


                    ))


                    }
                    {activeTab === 'all' && (
                        <>
                            <div >
                                <HomeServiceCard details={homeServiceDetails} />
                            </div>
                        </>
                    )
                    }
                </div >
                {pageSize && (
                    <div className="pagination absolute left-0 right-0 flex justify-end p-5 gap-3">
                        <button
                            className={`px-4 border-2 rounded-md ${currentPage === 0
                                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                                : "bg-white text-gray-700 "
                                }`}
                            disabled={currentPage === 0}
                            onClick={handlePreviousPage}>
                            {"<"} Prev
                        </button>
                        <span className="px-4 py-2">{`${currentPage + 1
                            } - ${pageCount}`}</span>
                        <button
                            className={`px-4 border-2 rounded-md ${currentPage === pageCount - 1
                                ? "bg-[#DDDEF9] text-gray-500 cursor-default"
                                : "bg-white text-gray-700"
                                }`}
                            disabled={currentPage === pageCount - 1}
                            onClick={handleNextPage}>
                            Next {">"}
                        </button>
                    </div>
                )}
                <Offer />

            </>
        )
    }
    ;
}

export default Category;