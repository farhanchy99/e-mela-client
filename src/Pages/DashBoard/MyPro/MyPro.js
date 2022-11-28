import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../hooks/useTitle';

const MyPro = () => {
    const { user } = useContext(AuthContext);
    const [myProducts, setMyProducts] = useState([]);

    useEffect( () =>{
        fetch(`http://localhost:5000/myproducts?email=${user?.email}`)
        .then(res =>res.json())
        .then(data => setMyProducts(data))
    }, [user]);

    const handleAd = (id) => {
          swal({
            title: "Are you sure you want to Advertise?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willAd) => {
            if (willAd) {
              fetch(`http://localhost:5000/product/ad/${id}`, {
                method: "PATCH",
                headers: {'content-type':'application/json'},
              })
                .then((res) => res.json())
                .then(() => {
                    swal({
                      title: "Product Advertised",
                      button: "OK",
                    });
                });
            } else {
              swal({
                icon: "success",
                title: "Advertised Canceled",
                button: "OK",
              });
            }
          });
    }
    useTitle('My Products');
    if(myProducts.length !== 0){
    return (
        <div className='w-11/12 lg:max-w-screen-xl mx-auto mt-10 mb-10'>
          <p className='text-xl text-black font-bold mt-10'>MY PRODUCTS</p>
          <h1 className='text-3xl text-green-500 font-bold mb-10'>Your Added Products: {myProducts.length}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10 justify-items-center'>
                {user?.email ?
                    <>
                    {myProducts.map(pro=>
                    <div className="card card-compact bg-green-500 shadow-xl text-slate-800 p-2.5">
                    <figure className='w-full h-48 m-auto'><img className="rounded-lg shadow-xl" src={pro.image} alt="Movie"/></figure>
                    <div className="card-body">
                    <h2 className="card-title text-white">{pro.title}</h2>
                        <h3 className='text-lg text-white'>Seller's Name: {pro.userName} 
                        {pro?.Verify === 'true' && <FontAwesomeIcon icon={faCircleCheck} className="text-lg font-bold text-blue-500 bg-white rounded-full"></FontAwesomeIcon>}</h3>
                        <p>Location: {pro.location}</p>
                        <p>Resale Price: ${pro.price1}</p>
                        <p>Original Price: ${pro.price}</p>
                        <p>Years of use: {pro.used}</p>
                        <div className="card-actions justify-end items-center">
                            <p className='text-xs text-gray-200'>{pro.time}</p>
                            <button  onClick={() =>handleAd(pro._id)} className="btn btn-sm bg-green-500 shadow-xl border-white">Advertise Now</button>
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
    }
    else{
        return (
          <div className='w-11/12 lg:max-w-screen-xl mx-auto mt-10 mb-10'>
                <p className='text-xl text-black font-bold mt-10'>MY PRODUCTS</p>
                <h1 className='text-3xl text-zinc-400 font-bold mb-10'>No Products Are HERE!</h1>
            </div>
        )
    }
};

export default MyPro;