import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';
import React from 'react';
import Loading from '../../../Shared/Loading/Loading';
import useTitle from '../../../hooks/useTitle';

const Reporteditems = () => {
    const {data: reports, isLoading =[]} = useQuery({
        queryKey: ['reports'],
        queryFn: () => fetch('http://localhost:5000/reportitems')
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
            fetch(`http://localhost:5000/reportitem/${id}`, {
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
                    reports.filter(
                    (order) => order._id !== id
                    );
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

      useTitle('Reported Items');
    if(isLoading){
        return <Loading></Loading>
    }
    
    if(reports.length !== 0){
        return (
            <div className='w-11/12 m-auto'>
                <h1 className='text-3xl text-green-500 font-bold my-10'>Reported Items</h1>
                <div className="overflow-x-auto w-11/12 m-auto text-black">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Products Name</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                    </thead>
    
                    <tbody>
                        {
                            reports.map(row => 
                            <tr key={row._id}>
                                <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={row?.image} alt="img"/>
                                    </div>
                                    </div>
                                </div>
                                </td>
                                <td>{row?.title}</td>
                                <td>{row?.price}</td>
                                <th>
                                    <div>
                                        <button onClick={() =>HandleDelete(row._id)} className='btn btn-sm bg-red-500'><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
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
                  <p className='text-xl text-black font-bold mt-10'>REPORTED ITEMS</p>
                  <h1 className='text-3xl text-zinc-400 font-bold mb-10'>No Reported Items Are HERE!</h1>
              </div>
          )
      }
};

export default Reporteditems;