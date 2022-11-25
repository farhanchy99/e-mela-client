import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const PerCat = () => {
    const [productList, setProductList] = useState([]);
    const{name} = useLoaderData();

    useEffect( () =>{
        fetch(`http://localhost:5000/products?brand=${name}`)
        .then(res =>res.json())
        .then(data => setProductList(data))
    }, [name]);
    
    console.log(productList)
    return (
        <div className='grid grid-cols-4 gap-4 my-10 justify-items-center'>
        {productList.map(pro=>
            <div className="card card-compact bg-green-500 shadow-xl text-slate-800">
                 {name ?
                 <>
                 <figure><img src={pro.img} alt="Movie"/></figure>
                 <div className="card-body">
                 <h2 className="card-title text-white">{pro.title}</h2>
                     <h3>Seller's Name:{pro.user}</h3>
                     <p>Location: {pro.location}</p>
                     <p>Resale Price: {pro.price1}</p>
                     <p>Original Price: {pro.price2}</p>
                     <p>Years of use: {pro.year}</p>
                     <div className="card-actions justify-end items-center">
                         <p className='text-xs'>{pro.time}</p>
                         <button className="btn bg-green-500 shadow-xl border-white">Book Now</button>
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
    );
};

export default PerCat;