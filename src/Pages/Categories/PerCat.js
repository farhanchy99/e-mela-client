import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
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
        <div className='max-w-screen-xl mx-auto my-10'>
        <div>
            <p className='text-xl text-black font-bold mt-10'>PRODUCTS</p>
            <h1 className='text-3xl text-green-500 font-bold'>{name} Brand Products</h1>
        </div>
        <div className='grid grid-cols-2 gap-4 my-10'>
        {productList.map(pro=>
            <div className="card card-side bg-green-500 shadow-xl text-slate-800 p-2.5" key={pro._id}>
                 {name ?
                 <>
                 <figure className='w-5/12'><img className="rounded-lg shadow-xl" src={pro.img} alt="Movie"/></figure>
                 <div className="card-body">
                    <h2 className="card-title text-white">{pro.title}</h2>
                     <p>Seller's Name: {pro.user}</p>
                     <p>Location: {pro.location}</p>
                     <p>Resale Price: {pro.price1}</p>
                     <p>Original Price: {pro.price2}</p>
                     <p>Years of use: {pro.year}</p>
                     <div className="card-actions justify-end items-center">
                         <p className='text-xs text-base-100 font-bold'>{pro.time}</p>
                         <label onClick={() => setModal(pro)} htmlFor="modalBook" className="btn bg-green-500 shadow-xl border-white">Book Now</label>
                         {
                            modal&&
                            <BookModal
                            modal={modal}
                        ></BookModal>
                        }
                        {/* Put this part before </body> tag */}
                        
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