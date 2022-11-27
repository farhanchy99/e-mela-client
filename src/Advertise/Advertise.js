import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { ImageViewer } from "react-image-viewer-dv";
import BookModal from '../Pages/Categories/BookModal';
import Loading from '../Shared/Loading/Loading';

const Advertise = () => {
    const [modal, setModal] = useState(null)

    const {data: myAds, isLoading =[]} = useQuery({
        queryKey: ['myAds'],
        queryFn: () => fetch('http://localhost:5000/advertisement')
        .then(res => res.json())
    })

    if(isLoading){
        return <Loading></Loading>
    }
    if(myAds.length !== null){
    return (
        <div>
        <p className='text-xl text-black font-bold mt-10'>ADVERTISEMENTS</p>
        <h1 className='text-3xl text-green-500 font-bold mb-10'>Sponsored Products</h1>
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
                     <p>Seller's Name: {mtAd.userName}</p>
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
        </div>
    );
    }
    else{
        return (
            <div>
                <h1>
                    No Products HERE!
                </h1>
            </div>
        )
    }
};

export default Advertise;