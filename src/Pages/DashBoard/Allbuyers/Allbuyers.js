import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import swal from 'sweetalert';

const Allbuyers = () => {
    const [dltBuyer, setdltBuyer] = useState([]);

    const {data: buyerList =[]} = useQuery({
    queryKey: ['buyerList'],
    queryFn: () => fetch('http://localhost:5000/users/allbuyers')
    .then(res => res.json())
    })

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
                  const RemainingOrder = dltBuyer.filter(
                    (review) => review._id !== id
                  );
                  setdltBuyer(RemainingOrder);
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
            <h1 className='text-3xl text-green-500 font-bold my-10'>All Buyers</h1>
            <div className="overflow-x-auto w-11/12 m-auto text-black">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Buyer Name</th>
                    <th>Email</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                    {
                        buyerList.map(row => 
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
                            
                            <th>
                                <div>
                                    <button onClick={() =>HandleDelete(row._id)} className='btn bg-red-500'>Delete User</button>
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

export default Allbuyers;