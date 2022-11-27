import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { faCircleCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
import swal from 'sweetalert';

const Allsellers = () => {
    const [dltSeller, setdltSeller] = useState([]);

    const {data: sellerList =[], refetch} = useQuery({
        queryKey: ['sellerList'],
        queryFn: () => fetch('http://localhost:5000/users/allsellers')
        .then(res => res.json())
    })

    const HandleVerify = (id) => {
      swal({
        title: "Are you sure you want to Verify this Seller?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willVerify) => {
        if (willVerify) {
          fetch(`http://localhost:5000/seller/verify/${id}`, {
            method: "PATCH",
            headers: {'content-type':'application/json'},
          })
            .then((res) => res.json())
            .then(() => {
                swal({
                  title: "Seller Verified",
                  button: "OK",
                });
                refetch()
            });
        } else {
          swal({
            icon: "success",
            title: "Verification Canceled",
            button: "OK",
          });
        }
      });
    }

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
            fetch(`http://localhost:5000/users/${id}`, {
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
                  const RemainingOrder = dltSeller.filter(
                    (review) => review._id !== id
                  );
                  setdltSeller(RemainingOrder);
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
            <div className='w-11/12 m-auto'>
                <h1 className='text-3xl text-green-500 font-bold my-10'>All Sellers</h1>
                <div className="overflow-x-auto w-11/12 m-auto text-black shadow-2xl">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Buyer Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
    
                    <tbody>
                        {
                            sellerList.map(row => 
                            <tr key={row._id}>
                                <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={row?.photoURL} alt="img"/>
                                    </div>
                                    </div>
                                </div>
                                </td>
                                <td>{row?.displayName}</td>
                                <td>{row?.email}</td>
                                <th></th>
                                <th>
                                    <div>
                                        <button onClick={() =>HandleDelete(row._id)} className='btn btn-sm bg-red-500'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                                    </div>
                                </th>

                                <th>
                                    <div>
                                        {row?.Verify !== 'true' ? 
                                        <button onClick={() =>HandleVerify(row._id)} className='btn btn-sm btn-primary'>Verify User</button>
                                         : 
                                        <h1 className='text-lg font-bold'>User Verified<FontAwesomeIcon icon={faCircleCheck} className="ml-5 text-xl font-bold text-blue-500"></FontAwesomeIcon></h1>
                                        }
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

export default Allsellers;