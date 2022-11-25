import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const MyPro = () => {
    const { user } = useContext(AuthContext);
    const [myProducts, setMyProducts] = useState([]);

    useEffect( () =>{
        fetch(`http://localhost:5000/myproducts?email=${user?.email}`)
        .then(res =>res.json())
        .then(data => setMyProducts(data))
    }, [user]);

    return (
        <div className='max-w-screen-xl mx-auto mt-10 mb-10'>
            <div className='grid grid-cols-4 gap-4 my-10 justify-items-center'>
                {user?.email ?
                    <>
                    {myProducts.map(pro=>
                    <div className="card card-compact bg-green-500 shadow-xl text-slate-800">
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
                            <button className="btn bg-green-500 shadow-xl border-white">Advertise Now</button>
                        </div>
                    </div>
                </div>
                )}
                </>
                    : 
                <>
                    <h1 className='text-3xl font-bold my-10 text-center text-green-500'>No Products Added Yet</h1>
                </>
                }
            
            </div>

        </div>
        
    );
};

export default MyPro;