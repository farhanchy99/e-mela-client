import React, { useEffect, useState } from 'react';
import { ImageViewer } from "react-image-viewer-dv";
import BookModal from '../Pages/Categories/BookModal';

const Advertise = () => {
    const [myAds, setMyAds] = useState([]);
    const [modal, setModal] = useState(null)

    useEffect( () =>{
        fetch(`http://localhost:5000/advertisement`)
        .then(res =>res.json())
        .then(data => setMyAds(data))
    }, []);

    return (
        <div className='w-11/12 lg:max-w-screen-xl mx-auto mt-10 mb-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10 justify-items-center'>
            {myAds.map(mtAd=>
            <div className="card card-compact lg:card-compact bg-green-500 shadow-xl text-slate-800 p-2.5" key={mtAd._id}>
                 <figure className='w-full h-48 m-auto'>
                 <ImageViewer>
                        <img className="rounded-lg shadow-xl" src={mtAd.image} alt="Movie"/>
                </ImageViewer>
                </figure>
                 <div className="card-body">
                    <h2 className="card-title text-white">{mtAd.title}</h2>
                     <p>Seller's Name: {mtAd.user}</p>
                     <p>Location: {mtAd.location}</p>
                     <p>Resale Price: $ {mtAd.price1}</p>
                     <p>Original Price: $ {mtAd.price2}</p>
                     <p>Years of use: {mtAd.year}</p>
                     <div className="card-actions justify-end items-center flex md:block lg:flex">
                         <p className='text-xs text-base-100 font-bold mb-0 md:mb-5 lg:mb-0'>{mtAd.time}</p>
                         <label onClick={() => setModal(mtAd)} htmlFor="modalBook" className="btn bg-green-500 shadow-xl border-white">Book Now</label>
                         {
                            modal&&
                            <BookModal
                            modal={modal}
                        ></BookModal>
                        }
                        {/* Put this part before </body> tag */}
                        
                     </div>
                 </div>
            </div>
            )}
        </div>
        </div>
    );
};

export default Advertise;