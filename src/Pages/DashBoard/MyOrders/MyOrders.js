import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [myOrd, setMyOrd] = useState([]);
    
    useEffect( () =>{
        fetch(`https://resale-web-server-rho.vercel.app/myorders?email=${user?.email}`)
        .then(res =>res.json())
        .then(data => setMyOrd(data))
    }, [user]);

    const HandleDelete = (id) => {
        swal("Are you sure you want to delete").then((value) => {
          if (value === true) {
          }
          swal({
            title: " Deleted Canceled",
            button: "OK",
          });
        });
        swal({
          title: "Are you sure you want to delete?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            fetch(`https://resale-web-server-rho.vercel.app/myorders/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                  swal({
                    title: "Product Deleted",
                    button: "OK",
                    icon: "success"
                  });
                  const RemainingOrder = myOrd.filter(
                    (order) => order._id !== id
                  );
                  setMyOrd(RemainingOrder);
                }
              });
          } else {
            swal({
              title: "Delete Canceled",
              button: "OK",
            });
          }
        });
      };
      useTitle('My Orders');
    if(myOrd.length !== 0){
    return (
        <div className='w-11/12 m-auto'>
            <h1 className='text-3xl text-green-500 font-bold my-10'>My Orders</h1>
            <div className="overflow-x-auto w-11/12 m-auto text-black">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Products Name</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                    {
                        myOrd.map(row => 
                        <tr key={row._id}>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={row?.img} alt="img"/>
                                </div>
                                </div>
                            </div>
                            </td>
                            <td>{row?.productName}</td>
                            <td>{row?.price}</td>
                            
                            <th>
                              {
                                row.price && !row.paid && <Link to={`/dashboard/payment/${row._id}`}><button className='btn bg-green-500'>Pay Now</button></Link>
                              }
                              {
                                row.price && row.paid && <span>Paid Successfully</span>
                              }
                            </th>
                            <th>
                                <div>
                                    <button onClick={() =>HandleDelete(row._id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                                </div>
                            </th>
                        </tr>)
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
    }
    else{
      return (
        <div className='w-11/12 lg:max-w-screen-xl mx-auto mt-10 mb-10'>
              <p className='text-xl text-black font-bold mt-10'>MY PRODUCTS</p>
              <h1 className='text-3xl text-zinc-400 font-bold mb-10'>No Orders Are HERE!</h1>
          </div>
      )
  }
};

export default MyOrders;