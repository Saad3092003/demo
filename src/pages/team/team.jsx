import React from 'react';
import p1 from '../aboutus/images/p1.jpeg';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getAllUsers_um } from '../../handleSlice';


function Team({loadScreen}) {


    const dispatch = useDispatch();

    const location = useLocation();
    const dept_id = location.state.id;
    const name = location.state.name;
    console.log(dept_id);

    useEffect(() => {
        const fetchUserData = async () => {
            
            loadScreen(true);
            await dispatch(getAllUsers_um());
          
           loadScreen(false);
        };
        fetchUserData();
       

    }, [dispatch]);

    let AllUserData = useSelector(
        (state) => state.userDetails.getAllUsers_um
    );
    console.log(AllUserData);

    const filteredArray = AllUserData.filter(item => item.dept_id === dept_id);
    const seoData = useSelector((state) => state.userDetails.getHomePage_cms_meta)
    console.log(filteredArray);
    let teams = [
        {
            img: 'https://s3-alpha-sig.figma.com/img/361d/81fd/bebdbe2bbf9a758ec9ca9cfffd744216?Expires=1691366400&Signature=V7grftLtNgBtt5rmAWYlJY-TZZjvKsh9AVJvMWdUmHdfZyzjC1v4Yx86i9j91A~zQ1vq~OUx1EFCWlaZEo2RoBs3NUbBjd99ybas70~MjTgmld3OijBPOA51gOU-eIjUu1LsvlDE4QcvXv0F0X2gfQNCXcv~eEKnD43wZgDs5s~XipJDwypBp0Zn9v40hR7tYHRNVfkkchDmUBvo9qcF-p7vIif5rpQxkTvQf-ISY58N9ne-BSUhRof7VHtgzfU7~yxQbtHA3knPwRt6Bfg7Xi05ckO3GUdCIX3m2acc9hBKEXHhjuHhcvjCSH75xpQSzIfqEv7Q9KZYafsfiVU~KQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/ae54/20ef/82d48ad4ddea54ec0dbe25842bfb9a45?Expires=1691366400&Signature=FgVKRG-p3THVb7NAMMIAcW7X6BP6jqB5lNI5ZeY9TXe-lzjcNYS7AI0w4KNKtIAt5WZXXRLXFnxJlrI4tuPaGLogd-RYFQzV1bfUK756hNDi1rN2yax9CykXfoV--P7MaCUpC4pD8HhImMBctYSUFIpc55p1HteNucdCUURiGqFH9WvZkJlomLx~bnVo0j5AE3AWkpm-o6w~RWM3-GV0TBZDwehapIxKv~FaZuNzIW-ULObUdbNSCbwiT9xHel1WurOQYptxccH7JLxGfrCC1i5wcUeXb9BcPr0AsNfWMI3MBt0Jfvzvq80KMkw9wgmivxnL1ff~LQanWdcx0irDRA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/361d/81fd/bebdbe2bbf9a758ec9ca9cfffd744216?Expires=1691366400&Signature=V7grftLtNgBtt5rmAWYlJY-TZZjvKsh9AVJvMWdUmHdfZyzjC1v4Yx86i9j91A~zQ1vq~OUx1EFCWlaZEo2RoBs3NUbBjd99ybas70~MjTgmld3OijBPOA51gOU-eIjUu1LsvlDE4QcvXv0F0X2gfQNCXcv~eEKnD43wZgDs5s~XipJDwypBp0Zn9v40hR7tYHRNVfkkchDmUBvo9qcF-p7vIif5rpQxkTvQf-ISY58N9ne-BSUhRof7VHtgzfU7~yxQbtHA3knPwRt6Bfg7Xi05ckO3GUdCIX3m2acc9hBKEXHhjuHhcvjCSH75xpQSzIfqEv7Q9KZYafsfiVU~KQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/ae54/20ef/82d48ad4ddea54ec0dbe25842bfb9a45?Expires=1691366400&Signature=FgVKRG-p3THVb7NAMMIAcW7X6BP6jqB5lNI5ZeY9TXe-lzjcNYS7AI0w4KNKtIAt5WZXXRLXFnxJlrI4tuPaGLogd-RYFQzV1bfUK756hNDi1rN2yax9CykXfoV--P7MaCUpC4pD8HhImMBctYSUFIpc55p1HteNucdCUURiGqFH9WvZkJlomLx~bnVo0j5AE3AWkpm-o6w~RWM3-GV0TBZDwehapIxKv~FaZuNzIW-ULObUdbNSCbwiT9xHel1WurOQYptxccH7JLxGfrCC1i5wcUeXb9BcPr0AsNfWMI3MBt0Jfvzvq80KMkw9wgmivxnL1ff~LQanWdcx0irDRA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/361d/81fd/bebdbe2bbf9a758ec9ca9cfffd744216?Expires=1691366400&Signature=V7grftLtNgBtt5rmAWYlJY-TZZjvKsh9AVJvMWdUmHdfZyzjC1v4Yx86i9j91A~zQ1vq~OUx1EFCWlaZEo2RoBs3NUbBjd99ybas70~MjTgmld3OijBPOA51gOU-eIjUu1LsvlDE4QcvXv0F0X2gfQNCXcv~eEKnD43wZgDs5s~XipJDwypBp0Zn9v40hR7tYHRNVfkkchDmUBvo9qcF-p7vIif5rpQxkTvQf-ISY58N9ne-BSUhRof7VHtgzfU7~yxQbtHA3knPwRt6Bfg7Xi05ckO3GUdCIX3m2acc9hBKEXHhjuHhcvjCSH75xpQSzIfqEv7Q9KZYafsfiVU~KQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/ae54/20ef/82d48ad4ddea54ec0dbe25842bfb9a45?Expires=1691366400&Signature=FgVKRG-p3THVb7NAMMIAcW7X6BP6jqB5lNI5ZeY9TXe-lzjcNYS7AI0w4KNKtIAt5WZXXRLXFnxJlrI4tuPaGLogd-RYFQzV1bfUK756hNDi1rN2yax9CykXfoV--P7MaCUpC4pD8HhImMBctYSUFIpc55p1HteNucdCUURiGqFH9WvZkJlomLx~bnVo0j5AE3AWkpm-o6w~RWM3-GV0TBZDwehapIxKv~FaZuNzIW-ULObUdbNSCbwiT9xHel1WurOQYptxccH7JLxGfrCC1i5wcUeXb9BcPr0AsNfWMI3MBt0Jfvzvq80KMkw9wgmivxnL1ff~LQanWdcx0irDRA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/361d/81fd/bebdbe2bbf9a758ec9ca9cfffd744216?Expires=1691366400&Signature=V7grftLtNgBtt5rmAWYlJY-TZZjvKsh9AVJvMWdUmHdfZyzjC1v4Yx86i9j91A~zQ1vq~OUx1EFCWlaZEo2RoBs3NUbBjd99ybas70~MjTgmld3OijBPOA51gOU-eIjUu1LsvlDE4QcvXv0F0X2gfQNCXcv~eEKnD43wZgDs5s~XipJDwypBp0Zn9v40hR7tYHRNVfkkchDmUBvo9qcF-p7vIif5rpQxkTvQf-ISY58N9ne-BSUhRof7VHtgzfU7~yxQbtHA3knPwRt6Bfg7Xi05ckO3GUdCIX3m2acc9hBKEXHhjuHhcvjCSH75xpQSzIfqEv7Q9KZYafsfiVU~KQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/ae54/20ef/82d48ad4ddea54ec0dbe25842bfb9a45?Expires=1691366400&Signature=FgVKRG-p3THVb7NAMMIAcW7X6BP6jqB5lNI5ZeY9TXe-lzjcNYS7AI0w4KNKtIAt5WZXXRLXFnxJlrI4tuPaGLogd-RYFQzV1bfUK756hNDi1rN2yax9CykXfoV--P7MaCUpC4pD8HhImMBctYSUFIpc55p1HteNucdCUURiGqFH9WvZkJlomLx~bnVo0j5AE3AWkpm-o6w~RWM3-GV0TBZDwehapIxKv~FaZuNzIW-ULObUdbNSCbwiT9xHel1WurOQYptxccH7JLxGfrCC1i5wcUeXb9BcPr0AsNfWMI3MBt0Jfvzvq80KMkw9wgmivxnL1ff~LQanWdcx0irDRA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/361d/81fd/bebdbe2bbf9a758ec9ca9cfffd744216?Expires=1691366400&Signature=V7grftLtNgBtt5rmAWYlJY-TZZjvKsh9AVJvMWdUmHdfZyzjC1v4Yx86i9j91A~zQ1vq~OUx1EFCWlaZEo2RoBs3NUbBjd99ybas70~MjTgmld3OijBPOA51gOU-eIjUu1LsvlDE4QcvXv0F0X2gfQNCXcv~eEKnD43wZgDs5s~XipJDwypBp0Zn9v40hR7tYHRNVfkkchDmUBvo9qcF-p7vIif5rpQxkTvQf-ISY58N9ne-BSUhRof7VHtgzfU7~yxQbtHA3knPwRt6Bfg7Xi05ckO3GUdCIX3m2acc9hBKEXHhjuHhcvjCSH75xpQSzIfqEv7Q9KZYafsfiVU~KQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/ae54/20ef/82d48ad4ddea54ec0dbe25842bfb9a45?Expires=1691366400&Signature=FgVKRG-p3THVb7NAMMIAcW7X6BP6jqB5lNI5ZeY9TXe-lzjcNYS7AI0w4KNKtIAt5WZXXRLXFnxJlrI4tuPaGLogd-RYFQzV1bfUK756hNDi1rN2yax9CykXfoV--P7MaCUpC4pD8HhImMBctYSUFIpc55p1HteNucdCUURiGqFH9WvZkJlomLx~bnVo0j5AE3AWkpm-o6w~RWM3-GV0TBZDwehapIxKv~FaZuNzIW-ULObUdbNSCbwiT9xHel1WurOQYptxccH7JLxGfrCC1i5wcUeXb9BcPr0AsNfWMI3MBt0Jfvzvq80KMkw9wgmivxnL1ff~LQanWdcx0irDRA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/361d/81fd/bebdbe2bbf9a758ec9ca9cfffd744216?Expires=1691366400&Signature=V7grftLtNgBtt5rmAWYlJY-TZZjvKsh9AVJvMWdUmHdfZyzjC1v4Yx86i9j91A~zQ1vq~OUx1EFCWlaZEo2RoBs3NUbBjd99ybas70~MjTgmld3OijBPOA51gOU-eIjUu1LsvlDE4QcvXv0F0X2gfQNCXcv~eEKnD43wZgDs5s~XipJDwypBp0Zn9v40hR7tYHRNVfkkchDmUBvo9qcF-p7vIif5rpQxkTvQf-ISY58N9ne-BSUhRof7VHtgzfU7~yxQbtHA3knPwRt6Bfg7Xi05ckO3GUdCIX3m2acc9hBKEXHhjuHhcvjCSH75xpQSzIfqEv7Q9KZYafsfiVU~KQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/ae54/20ef/82d48ad4ddea54ec0dbe25842bfb9a45?Expires=1691366400&Signature=FgVKRG-p3THVb7NAMMIAcW7X6BP6jqB5lNI5ZeY9TXe-lzjcNYS7AI0w4KNKtIAt5WZXXRLXFnxJlrI4tuPaGLogd-RYFQzV1bfUK756hNDi1rN2yax9CykXfoV--P7MaCUpC4pD8HhImMBctYSUFIpc55p1HteNucdCUURiGqFH9WvZkJlomLx~bnVo0j5AE3AWkpm-o6w~RWM3-GV0TBZDwehapIxKv~FaZuNzIW-ULObUdbNSCbwiT9xHel1WurOQYptxccH7JLxGfrCC1i5wcUeXb9BcPr0AsNfWMI3MBt0Jfvzvq80KMkw9wgmivxnL1ff~LQanWdcx0irDRA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
            pname: 'Team Member Name',
            position: 'Director and Founder',
        },
    ]
    return (
        <>
         <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>

            <div className='text-white text-center position-relative' style={{ height: '70vh', }}>
                {/* <img src={p1} className='w-100 img-fluid object-fit-cover ' style={{ height: '70vh', filter: 'brightness(0.3)' }} /> */}
                <div className='position-absolute top-0 start-0 w-100 h-100' style={{ height: '70vh', backgroundImage: `url(${p1})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', filter: 'brightness(0.5)' }}></div>
                <div className='position-absolute top-0 start-0 w-100 h-100 d-grid place-items-center'>
                    <div data-aos='zoom-in'>
                        <p className='display-3 fw-bold'>Meet Our Team</p>
                        <h4>{name} Department</h4>
                    </div>
                </div>
            </div>
            <div className="container py-5">
                <div className='row g-4'>
                    {filteredArray.map((items, index) => (
                        <>
                            <div key={index} data-aos='fade-up' data-aos-duration='700' data-aos-delay={(index % 4) * 200} className='col-md-6 col-lg-4 col-xl-3'>
                                <div className='shadow rounded bg-white overflow-hidden'>
                                    <div style={{ height: '15rem' }} className='overflow-hidden slider-card' >
                                        <img className='img-fluid w-100 h-100 object-fit-cover t5' src={items.pic_url} alt={items.uname} />
                                    </div>
                                    <div className='p-3'>
                                        <h4>{items.uname}</h4>
                                        <p className='text-secondary'>{items.role}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Team;