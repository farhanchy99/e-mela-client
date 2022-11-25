import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../contexts/AuthProvider';
import swal from 'sweetalert';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [myOrd, setMyOrd] = useState([]);
    
    useEffect( () =>{
        fetch(`http://localhost:5000/myorders?email=${user?.email}`)
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
            fetch(`http://localhost:5000/myorders/${id}`, {
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
                    (review) => review._id !== id
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


    return (
        <div>
            <h1 className='text-3xl text-green-500 font-bold my-10'>My Orders</h1>
            <div className="overflow-x-auto w-11/12 m-auto text-black">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Title ID</th>
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
                                <div>
                                    <button className='btn bg-green-500'>Pay Now</button>
                                </div>
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
};

export default MyOrders;