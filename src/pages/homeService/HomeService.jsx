import React, { useState, useEffect } from "react";
import Offer from '../../components/Offer';
import HomeServiceCard from '../../components/HomeServiceCard';
import electricalimg from './images/electrical.png';
import selectall from './images/select-all.png'
import '../../assets/css/HomeService.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HSM_allProduct } from "../../handleSlice";
import { HSM_category } from "../../handleSlice";
import Category from "../../components/Category";

function HomeService({ loadScreen }) {
    // const cats = [
    //     {
    //         img: electricalimg,
    //         catname: 'Electrical',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/9ce7/b67e/dee3d4200e0ed1eceed49935dc6b67c0?Expires=1691366400&Signature=IH1mUzzRnCunyGmaMeBwt4a7OTRk3wmGNyVhajZSbNtVwJ75QxvdK8S8a328yY89JRL6FUOOgqC7VTyGfnCX-wfbZtsLQorc8OGPq9Q6FKdiYumOUFYogJjLwLNCHTKLPOV3Aq13HdSyRVLF7JnrW-EhJ91Jt7c2--vtqUVbTrVV2SfyQPJsiOlBO7XLmAaXocir-bQcpmEjgOsFx9QEibmaUlCQYx~gEZad6ZRJLiUK1cvu1nOifH~Y1KmqoxDKIpZ3ndFXS74gAJYNWG3uaQrXGVjjl7YqhUXIpZ~0vTlQV1058hg3kyOW7P5lolSqdPjt-A9dsYpP3DKko5Q~MA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Plumbing',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/5d9e/e069/57fbd137613190012d170603c28d497d?Expires=1691366400&Signature=lAFCD7pW4iiNdYn-0kbYz5XaFqS9R5XxX-gUWy~8qnLHt5DNHYsJ-TlGvxXDXxmhpNd8CAwpaxKmmT~PacfZ9g6YJmNJR~7jsvNpWaGuX6IpCx5DkWjfxU73kLMf0hvMCJnhzrhOJCe4T2jaTwMlGUW4SHoD81U9eyqjtCkphgI07mybBEQE2wq6yiCy5S-d1gq9cnoygTr4vP~4tGFcWvtVKll7lEGrH~3r1VaiJUtGAD1tP9JD1-KqlDKSDbdqBROleCJ3JEq6s0MtRqwZeBrr72QlW0U3JZLsUJOotKdMTiQwxMVW3hR-a~I9eU3p9V-mDKVxTsIdMfMx6kv2~Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Aircon service',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/0223/2c96/627176f7bd0adaef3ecad712ae679bea?Expires=1691366400&Signature=XLi8Hx9HB6z-tASAWag76RDno~mS7ZH~l7vKeM2jw2XVCO6KxmqLMU1gIxkP47~IwIQU3o~yDQcfXVqLyU8U3zP0~ctHcQpTMN6AQfXO0tYQh4EjrB~R6bfy4nC4gKfnfW~KLkBqSpMNwWiaSeu4QdyLn9NAoFJDtIAA-jOkZOZM11zep6OQsiu~ABpbUwWh0XRaxbaOt-70FhlAi3sc510wDL7RINjWHzA8uWj0QUmlIKkTscqgkh-9XOdhWho~ZH69iuZtMCzxg4fmRHUv2BXKFnYdvReBe-qRzZy6nk3J7d-unAJLj~gv7ju5f~0YEmxUTB8m-xBsltTOHGZHUg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Handyman Services',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/7f0f/b82a/154ec65a1839013a7de9b28a7aaf0585?Expires=1691366400&Signature=lVIRxn-jqaa6f1jS8nh2H02spG8ma3wgLYKaLR-oFkJBhKt3qDu6SdfNNEOeycUeuCRNMCi-~c~fkw2PcYvLVQcqoXmcosbr9VFR1QueGgLa3BTECgbpNkPyu8IOZb~YZ9zkUgJOfkR6oqLcRYh6TxrvyfP1Y3vfisXLS8zWMkilnwaU7slEeTEr8nXIBwWvFhtq8JwvjtjUpfxumNcFUSBZoycRYWenZuIiEpgX82lmuaSDVZjQ9I2yZvRdnhVpwMYjRPCp5brzv3I0sWRfFDp~cI20I-ITllO95H3Iu68xQwlQ0hMalqTnip1Llp7Ic9anLg~e-u7gyeUHfe2ntA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Carpentry Services',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/2f59/79ea/d4c88598bccd9e688289f88764d8e483?Expires=1691366400&Signature=DJlHRlu~gTFj~q51w2oCNwz0VbKBGTrlUl0PXCYtUQl5HbHrR7FAiQAK2dit2gkuRzfgGvbR7tm-2xEF2bUpgUHMTHH6vSsONSgEiEVJdYOHgz0oVVnONHTKPcBO7M51ez30ulRqK--IihWHS7nXEEKptMoHszLGfxhFtxnXnKmb4ekzVitoBgKh5ZOACyIbmcPpyBDcF378pO8DfgHKmKTt8OcZ84M5VF9TOXTgLuXJWD8QSxGvFSVmKzLiXCiLaEob0TL3kFrdX2fCYsDnV5Hx5UaNgs40z8fnxSkXWBIyBPHrXtRpHEpFIRc1UVtldQ~vsgmRGhy0BQwHFuk8Ow__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Tiling Works',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/8092/0154/71b6b2224ff26690aa082a0917e08070?Expires=1691366400&Signature=Duphy-7bgqE-S3JkEuQUMImBgXOMxIW5SPWzLS6rnR8WXskUQnwsL5N~z0XnbdKKLp73myvGN5RYkt5OmYrLYKCRxxb025pom0Aim2D1ptjGME8Zu~18eMVqlK6oB4dFPaG1YFKc59kD75Ef0s~nbf-etsAv10Yzc19bnky3R~7TDdBHJJcwREdRLt5dRU4s3yrv43O7Vpu9JIQLNO2beqyWTbDbH634wdgaCFQDB3rfpiMH6R~sHuo-fIWPUeUllYTcS7-JrjtIJ9vEuKKkzdS47V3l0h3zDLfhzu2J4hDR5d~mwDeAgQmJavwt5RgTyQ3OJLJVRmuwsmUBCqMlOw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Ceiling & Partition',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/b53c/c46d/cf2ffec61b2390d9673c0d3f1c3213bb?Expires=1691366400&Signature=VF89xxUqeEwvAc0uJcLOkBZ-ROEcwV8JIGjYDJ1kSEoolfbtBo9bEHCvIit6XY0j-TkIKrpT9oaaUsE3ZD~ZTwHRHw4jaotojOWLVVlpt~JllGYN93kXpriG1eV6ejL196GxFCuf3bnapI4QPZ6jbUkYWyh9TreP4uuwnfDNZI26Ai2ymilGc3a48Z4Xiqk3jBGegpFpjdrEqQLr4W~EyFde0zG4wmrvxuSouXl1YMqQnEkDAeTADHtacQ-LT9Jkv-TY0elcwp2PrDWN2rQ1lzCIHkPeoSFJEqWOv9VK-phj~mYHwDuaBKiKMaXAzIS1mNzSq5sMTsQV7ptdvE05~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Painting Works',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/b53c/c46d/cf2ffec61b2390d9673c0d3f1c3213bb?Expires=1691366400&Signature=VF89xxUqeEwvAc0uJcLOkBZ-ROEcwV8JIGjYDJ1kSEoolfbtBo9bEHCvIit6XY0j-TkIKrpT9oaaUsE3ZD~ZTwHRHw4jaotojOWLVVlpt~JllGYN93kXpriG1eV6ejL196GxFCuf3bnapI4QPZ6jbUkYWyh9TreP4uuwnfDNZI26Ai2ymilGc3a48Z4Xiqk3jBGegpFpjdrEqQLr4W~EyFde0zG4wmrvxuSouXl1YMqQnEkDAeTADHtacQ-LT9Jkv-TY0elcwp2PrDWN2rQ1lzCIHkPeoSFJEqWOv9VK-phj~mYHwDuaBKiKMaXAzIS1mNzSq5sMTsQV7ptdvE05~g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Aluminium & Metal',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/2f59/79ea/d4c88598bccd9e688289f88764d8e483?Expires=1691366400&Signature=DJlHRlu~gTFj~q51w2oCNwz0VbKBGTrlUl0PXCYtUQl5HbHrR7FAiQAK2dit2gkuRzfgGvbR7tm-2xEF2bUpgUHMTHH6vSsONSgEiEVJdYOHgz0oVVnONHTKPcBO7M51ez30ulRqK--IihWHS7nXEEKptMoHszLGfxhFtxnXnKmb4ekzVitoBgKh5ZOACyIbmcPpyBDcF378pO8DfgHKmKTt8OcZ84M5VF9TOXTgLuXJWD8QSxGvFSVmKzLiXCiLaEob0TL3kFrdX2fCYsDnV5Hx5UaNgs40z8fnxSkXWBIyBPHrXtRpHEpFIRc1UVtldQ~vsgmRGhy0BQwHFuk8Ow__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Vinyl Flooring',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/70cf/926b/993755f3aa3068970aa5c1be6d448e79?Expires=1691366400&Signature=EXv~UeBWjo4SLrz8-DrV9nxGThV0XZ7oCPystbW7RcSBM1RgHyvsuovAnykmiyIsyUDU9PSLPUF~dfprTPPmdJ6fmPHuVRtIjd7MVJorGpz7nqNkjN2SXZTqn2c3~YRkKDZXr-T4EL0Rjb1y90m7FIgts7DnA7QWAB3dTUEpfcyUNnC6FmQ4IRMNHqqyrbZmTxe9fKgCbNjnFOGfv1Z~oM1zDJT41mQpPhdFE3KpppDvuApxblC44ZG~7Py1Xh5p~pwvOcg05r79iwBnaSyKKz7L3pgf7KS2thBqwL7rfKCPRw3BxfcM9YC48E8gs9mrBjzYgyj4JpSZdjEVYjjwAA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Glass Works',
    //     },
    //     {
    //         img: 'https://s3-alpha-sig.figma.com/img/0221/121f/0bbe0f886cb013d0b8fddd73fc0ac9f8?Expires=1691366400&Signature=gZ-bN14j3MLGVZVPKsTLQaoSftEBq4Mcr4RQLlg4ADPDVcXOUKFPOrrSX9Yz6M2SJ8BzJLtN68m6F277uZgBgIOSTvp2zfIZg4fa9rZ0LfuFSr0VoOOSoFX8NGzCtIKvv6YF12X2MF7rUWAoPR9qX2QibJlT7jSv9SCzuUz1O8K5-weFd54071gPjn29NtwfmivIYxmByCvzUFuAbfWLhJVwHvsszNQoWNEUmGBkfK2fhd8r0bXsDbXuKrhZXzTn29-~BXKNw9DuuBIg7veMJUNGvYiyj2i5iLQ6ohT7~C4GK56Va0FWjzeiHrdjxftJc1rBsFWZyLJ1MygRStxebQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    //         catname: 'Dismantling & Disposal',
    //     },


    // ]
    const name = 'HSM'
    const [activeTab, setactiveTab] = useState(null);
    const handleActiveTabChange = (no) => {
        setactiveTab(no)
    }
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserData = async () => {
            loadScreen(true);
            await dispatch(HSM_allProduct());
            await dispatch(HSM_category());
            loadScreen(false);
        };
        fetchUserData();
    }, [dispatch]);
    let homeServiceDetails = useSelector(
        (state) => state.userDetails.hsm_allproducts
    );
    const category = useSelector((state) => state.userDetails.hsm_category);
    console.log(homeServiceDetails);
    return (
        <>
            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>Home Service</h1>
            </div>

            <Category loadScreen={loadScreen} categoryDetails={category} pageSize={8} productDetails={homeServiceDetails} pageName={name} />
        </>
    );
}

export default HomeService;