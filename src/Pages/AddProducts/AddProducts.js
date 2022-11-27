import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import moment from 'moment';
import swal from 'sweetalert';
import { AuthContext } from '../../contexts/AuthProvider';

const AddProducts = () => {
    const {user} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [select, setSelect] = useState();
    
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();
    
    const { data: catlists, isLoading } = useQuery({
        queryKey: ['catlist'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            return data;
        }
    })

    const handlePro = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })

        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);
                const products = {
                    userName : user?.displayName || 'unregistered',
                    email : user?.email || 'unregistered',
                    title: data.title,
                    brand: data.catlist,
                    location: data.location,
                    price1: data.price1,
                    price: data.price2,
                    phone: data.phone,
                    used: data.used,
                    year: data.year,
                    about: data.about,
                    time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                    image: imgData.data.url,
                    select: data.select
                }

                // save doctor information to the database
                fetch('http://localhost:5000/products', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                    },
                    body: JSON.stringify(products)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                    swal({
                        title: "Product Added Successfully",
                        button: "OK",
                        icon: "success"
                    });
                    navigate('/myproducts')
                })
            }
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className=''>
        <div>
            <div className='my-10'>
                <div className='w-11/12 lg:w-1/2 m-auto'>
                    <p className='text-xl text-black font-bold mt-10'>ADD PRODUCTS</p>
                    <h1 className='text-3xl text-green-500 font-bold'>Add Your Products</h1>
                </div>
            <form onSubmit={handleSubmit(handlePro)}>
                <div className='card-body w-11/12 lg:w-1/2 bg-base-100 shadow-2xl rounded-lg m-auto my-10'>
                    <div className='w-1/2'>
                        <h1>Product Condition</h1>
                        <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Excellent</span> 
                            <input type="radio" name="select" className="radio checked:bg-green-500" {...register("select", {required: true})} value="Excellent" onChange={e=> setSelect(e.target.value)}/>
                        </label>
                        </div>
                        <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Good</span> 
                            <input type="radio" name="select" className="radio checked:bg-green-500" {...register("select", {required: true})} value="Good" onChange={e=> setSelect(e.target.value)}/>
                        </label>
                        </div>
                        <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Fair</span> 
                            <input type="radio" name="select" className="radio checked:bg-green-500" {...register("select", {required: true})} value="Fair" onChange={e=> setSelect(e.target.value)}/>
                        </label>
                        </div>    
                    </div>

                    <div className='form-control'>
                        <input type="text" placeholder='Product Name' {...register("title", {required: "Product Name is Required"})} className="input input-bordered w-full backdrop-blur-sm bg-white/30"/>
                    </div>
                    
                    <select className="select select-bordered w-full" {...register('catlist')}>
                    {
                        catlists.map(catlist => <option key={catlist._id} value={catlist.name}>{catlist.name}</option>)
                    }
                    </select>

                    <div className='form-control'>
                        <input name="userName" type="text" defaultValue={user?.displayName} className="input input-bordered w-full backdrop-blur-sm bg-white/30" disabled/>
                    </div>

                    <div className='form-control'>
                        <input type="text" placeholder='Location' {...register("location", {required: "Location is Required"})} className="input input-bordered w-full backdrop-blur-sm bg-white/30"/>
                    </div>

                    <div className='form-control'>
                        <input type="number" placeholder="Resale Price" {...register("price1", {required: "Resale Price is Required"})} className="input input-bordered w-full backdrop-blur-sm bg-white/30"/>
                    </div>

                    <div className='form-control'>
                        <input type="number" placeholder="Original Price" {...register("price2", {required: "Original Price is Required"})} className="input input-bordered w-full backdrop-blur-sm bg-white/30"/>
                    </div>

                    <div className='form-control'>
                        <input type="tel" placeholder="Phone Number" {...register("phone", {required: "Phone Number is Required"})} className="input input-bordered w-full backdrop-blur-sm bg-white/30" pattern="[0-9]{11}"/>
                    </div>
                    
                    <div className='form-control'>
                        <input type="number" placeholder="Year of use" {...register("used", {required: "This Field is Required"})} className="input input-bordered w-full backdrop-blur-sm bg-white/30"/>
                    </div>

                    <div className='form-control'>
                        <input type="number" placeholder="Year of Buy" {...register("year", {required: "This Field is Required"})} className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>

                    <div className="form-control">
                        <input type="file" {...register("image", {
                            required: "Photo is Required"
                        })} className="input input-bordered w-full backdrop-blur-sm bg-white/30" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>

                    <div className="form-control">
                        <textarea className="textarea textarea-bordered backdrop-blur-sm bg-white/30" placeholder="Details Please" {...register("about", {required: "This Field is Required"})}></textarea>
                    </div>
                    <button className='btn bg-green-500' type='submit'>Add Product</button>
                </div>
            </form>

            <div>
            </div>
            
        </div>
        </div>

        </div>
    );
};

export default AddProducts;