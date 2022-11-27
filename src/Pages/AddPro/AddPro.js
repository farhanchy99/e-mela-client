import React, { useContext } from 'react';
import moment from 'moment';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';

const AddPro = () => {
    const {user} = useContext(AuthContext)
    const imageHostKey = process.env.REACT_APP_imgbb_key
    console.log(imageHostKey)

    const {data: catlists =[]} = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('http://localhost:5000/categories')
        .then(res => res.json())
    })
    
    const handlePro = event =>{
        event.preventDefault();
        const form = event.target;
        const userName = user?.displayName || 'unregistered';
        const email = user?.email || 'unregistered';
        const image = form.image[0];
        const brand = form.proBrand.value
        const title = form.proName.value;
        const proTitle = form.proName.value;
        const location = form.proLocation.value;
        const price1 = form.proPrice1.value;
        const price2 = form.proPrice2.value;
        const phone = form.proPhone.value;
        const year = form.proYear.value;
        const used = form.proYearUse.value;
        const about = form.about.value;


        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            console.log(imgData)
            if(imgData.success){
                console.log(imgData.data.url);
                const addProducts = {
                    title,
                    proTitle,
                    user: userName,
                    brand,
                    location,
                    price1,
                    price2,
                    phone,
                    image: imgData.data.url,
                    year,
                    used,
                    time:moment().format('lll'),
                    email,
                    about
                }

                // save doctor information to the database
                

                fetch('http://localhost:5000/products', {
                    method: 'POST',
                    headers:{
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(addProducts)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.acknowledged){
                        swal({
                            title: "Product Added Successfully",
                            button: "OK",
                            icon: "success"
                        });
                        form.reset();
                    }
                })
                .catch(err => console.error(err));
            }
        })
    }

    return (
        <div>
            <div className='my-10'>
                <div className='w-11/12 lg:w-1/2 m-auto'>
                    <p className='text-xl text-black font-bold mt-10'>ADD PRODUCTS</p>
                    <h1 className='text-3xl text-green-500 font-bold'>Add Your Products</h1>
                </div>
            <form onSubmit={handlePro}>
                <div className='card-body w-11/12 lg:w-1/2 bg-base-100 shadow-2xl rounded-lg m-auto my-10'>
                    <div className='w-1/2'>
                        <h1>Product Condition</h1>
                        <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Excellent</span> 
                            <input type="radio" name="radio-10" className="radio checked:bg-green-500" checked />
                        </label>
                        </div>
                        <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">good</span> 
                            <input type="radio" name="radio-10" className="radio checked:bg-green-500" checked />
                        </label>
                        </div>
                        <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">fair</span> 
                            <input type="radio" name="radio-10" className="radio checked:bg-green-500" checked />
                        </label>
                        </div>    
                    </div>

                    <div className='form-control'>
                        <input name="proName" type="text" placeholder="Product Name" className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>
                    
                    <select className="select select-bordered w-full" name="proBrand">
                    {
                        catlists.map(catlist => <option key={catlist._id}>{catlist.name}</option>
                        )
                    }
                    </select>

                    <div className='form-control'>
                        <input name="proUser" type="text" defaultValue={user?.displayName} className="input input-bordered w-full backdrop-blur-sm bg-white/30" disabled/>
                    </div>

                    <div className='form-control'>
                        <input name="proLocation" type="text" placeholder="Location" className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>

                    <div className='form-control'>
                        <input name="proPrice1" type="number" placeholder="Resale Price" className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>

                    <div className='form-control'>
                        <input name="proPrice2" type="number" placeholder="Original Price" className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>

                    <div className='form-control'>
                        <input name="proPhone" type="tel" placeholder="Phone Number" className="input input-bordered w-full backdrop-blur-sm bg-white/30" pattern="[0-9]{11}" required/>
                    </div>
                    
                    <div className='form-control'>
                        <input name="proYearUse" type="number" placeholder="Year of use" className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>

                    <div className='form-control'>
                        <input name="proYear" type="number" placeholder="Year of Buy" className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>

                    <div className="form-control">
                        <input name="image" type="file" placeholder="Photo URL" className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>

                    <div className="form-control">
                        <textarea name="about" className="textarea textarea-bordered backdrop-blur-sm bg-white/30" placeholder="Details Please" required></textarea>
                    </div>
                    <button className='btn bg-green-500' type='submit'>Add Product</button>
                </div>
            </form>

            <div>
            </div>
            
        </div>
        </div>
    );
};

export default AddPro;