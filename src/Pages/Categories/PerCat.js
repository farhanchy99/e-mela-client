import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ImageViewer } from "react-image-viewer-dv";
import BookModal from './BookModal';

const PerCat = () => {
    const [productList, setProductList] = useState([]);
    const [modal, setModal] = useState(null)
    const{name} = useLoaderData();

    useEffect( () =>{
        fetch(`http://localhost:5000/products?brand=${name}`)
        .then(res =>res.json())
        .then(data => setProductList(data))
    }, [name]);
    
    console.log(productList)
    return (
        <div className='w-11/12 lg:max-w-screen-xl mx-auto my-10'>
        <div>
            <p className='text-xl text-black font-bold mt-10'>PRODUCTS</p>
            <h1 className='text-3xl text-green-500 font-bold'>{name} Brand Products</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-10'>
        {productList.map(pro=>
            <div className="card card-compact lg:card-side bg-green-500 shadow-xl text-slate-800 p-2.5" key={pro._id}>
                 {name ?
                 <>
                 <figure className='w-full md:w-5/12 lg:w-5/12'>
                 <ImageViewer>
                    <img className="rounded-lg shadow-xl" src={pro.image} alt="Movie"/>
                </ImageViewer>
                </figure>
                 <div className="card-body">
                    <h2 className="card-title text-white">{pro.title}</h2>
                     <p>Seller's Name: {pro.userName}</p>
                     <p>Product condition: {pro.select}</p>
                     <p>Location: {pro.location}</p>
                     <p>Resale Price: {pro.price1}</p>
                     <p>Original Price: {pro.price}</p>
                     <p>Years of use: {pro.used}</p>
                     <p>Product Buy: {pro.year}</p>
                     <p>Product Details: {pro.about}</p>
                     <div className="card-actions justify-end items-center flex md:block lg:flex">
                         <p className='text-xs text-base-100 font-bold mb-0 md:mb-5 lg:mb-0'>{pro.time}</p>
                         <label onClick={() => setModal(pro)} htmlFor="modalBook" className="btn bg-green-500 shadow-xl border-white">Book Now</label>
                         {
                            modal&&
                            <BookModal
                            modal={modal}
                        ></BookModal>
                        }
                     </div>
                 </div>
                 </>
                 : 
                <>
                    <div><h1 className='text-3xl font-bold my-10 text-center'>No Review Yet</h1></div>
                </>
                }
        </div>
        )}
            
        </div>
        </div>
    );
};

export default PerCat;