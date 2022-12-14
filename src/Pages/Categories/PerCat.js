import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ImageViewer } from "react-image-viewer-dv";
import BookModal from './BookModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from '../../contexts/AuthProvider';

const PerCat = () => {
    const [productList, setProductList] = useState([]);
    const {user} = useContext(AuthContext)
    const [modal, setModal] = useState(null)
    const{name} = useLoaderData();

    useEffect( () =>{
        fetch(`https://resale-web-server-rho.vercel.app/products/?brand=${name}`)
        .then(res =>res.json())
        .then(data => setProductList(data))
    }, [name]);

    const handleReport = (id) => {
        swal({
          title: "Are you sure to Report this Product?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willAd) => {
          if (willAd) {
            fetch(`https://resale-web-server-rho.vercel.app/product/report/${id}`, {
              method: "PATCH",
              headers: {'content-type':'application/json'},
            })
              .then((res) => res.json())
              .then(() => {
                  swal({
                    title: "Product Reported",
                    button: "OK",
                  });
              });
          } else {
            swal({
              icon: "success",
              title: "Report Canceled",
              button: "OK",
            });
          }
        });
  }

    console.log(productList)
    useTitle('Products');
    return (
        <div className='w-11/12 lg:max-w-screen-xl mx-auto my-10'>
        <div>
            <p className='text-xl text-black font-bold mt-10'>PRODUCTS</p>
            <h1 className='text-3xl text-green-500 font-bold'>{name} Brand Products</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10'>
        {productList.map(pro=>
            <div className="card card-compact bg-green-500 shadow-xl text-slate-800 p-2.5" key={pro._id}>
                 {name ?
                 <>
                 <figure className='w-full h-48 m-auto'>
                 <ImageViewer>
                    <img className="rounded-lg shadow-xl" src={pro.image} alt="Movie"/>
                </ImageViewer>
                </figure>
                 <div className="card-body">
                  <div className='flex justify-between'>
                    <h2 className="card-title text-white">{pro.title}</h2>
                    <div onClick={() =>handleReport(pro._id)} className="btn btn-sm bg-red-500"><FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon></div>
                  </div>
                    <h3 className='text-lg text-white'>Seller's Name: {pro.userName} 
                    {pro?.Verify !== "true" && <FontAwesomeIcon icon={faCircleCheck} className="text-lg font-bold text-blue-500 bg-white rounded-full"></FontAwesomeIcon>}</h3>
                     <p>Product condition: {pro.select}</p>
                     <p>Location: {pro.location}</p>
                     <p>Resale Price: ${pro.price1}</p>
                     <p>Original Price: ${pro.price}</p>
                     <p>Years of use: {pro.used}</p>
                     <p>Product Buy: {pro.year}</p>
                     <p>Product Details: {pro.about}</p>
                    <p className='text-xs text-base-100 font-bold mb-0 md:mb-5 lg:mb-0'>{pro.time}</p>
                     <div className="card-actions justify-end items-center flex md:block lg:flex">
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