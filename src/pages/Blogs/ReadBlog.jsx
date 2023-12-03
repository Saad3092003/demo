import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllBlogs_cms, getBlog_cms } from '../../handleSlice';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState } from 'react';

const ReadBlog = ({ loadScreen }) => {
  loadScreen(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const blog_id = params.id;
  useEffect(() => {
    const getBlogData = async () => {
      await dispatch(getBlog_cms(blog_id));
    }
    getBlogData();

  }, [dispatch])
  const seoData = useSelector((state) => state.userDetails.getHomePage_cms_meta)
  const blogData = useSelector((state) => state.userDetails.getBlog_cms);
  const [tagArray, settagArray] = useState([]);
  useEffect(() => {
    if (blogData.tags) {
      let t = blogData.tags.split(',')
      settagArray(t)
    }
  }, [blogData])
  console.log(tagArray);
  return (
    <>
     <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>
    <div className="">
      <div className="position-relative vw-100" style={{ height: '70vh', }}>
        <img src={blogData.banner_image} alt="Blog Banner" className="w-100 h-100 object-fit-cover mb-3 " />
        <div className="banner-content-overlay glass p-3 text-end  text-white rounded-3 position-absolute w-100" style={{ maxWidth: '400px', top: '50%', right: '10%' }}>
          <div dangerouslySetInnerHTML={{ __html: blogData.banner_content }}></div>
          <p>Published By: <span className='text-theme fw-blod fs-4'>{blogData.added_by}</span></p>
        </div>
      </div>
      <div className="container mt-5">
        <div className="">
          <div className='d-flex justify-content-between'>
            <h1 className='text-capitalize text-success'>{blogData.name}</h1>
            <div className='fs-5'>
              
              <p>Category: <span className='text-primary'>{blogData.category}</span></p>
            </div>
          </div>
          <div className="d-flex gap-2 mb-3">
            {tagArray.length > 0 && tagArray.map((items, index) => (
              <>
                <div key={index} data-aos='fade-right' data-aos-duration='1000' data-aos-delay={(index) * 200} className='bg-light2 px-3 py-2 rounded-pill'>
                  {items}
                </div>
              </>
            ))}
          </div>
          <div data-aos='fade-up'>
            <div dangerouslySetInnerHTML={{ __html: blogData.blog_content }}></div>
          </div>

          <div data-aos='fade-up'>
            <div dangerouslySetInnerHTML={{ __html: blogData.blog_short_content1 }}></div>
          </div>

          <div data-aos='fade-up'>
            <div dangerouslySetInnerHTML={{ __html: blogData.blog_short_content2 }}></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ReadBlog;
