import React, { useContext } from 'react';
import moment from 'moment';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';

const AddPro = () => {
    const {user} = useContext(AuthContext)

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
        const brand = form.proBrand.value
        const title = form.proName.value;
        const location = form.proLocation.value;
        const price1 = form.proPrice1.value;
        const price2 = form.proPrice2.value;
        const img = form.proImg.value;
        const year = form.proYear.value;
        const about = form.about.value;


        const addProducts = {
            title,
            user: userName,
            brand,
            location,
            price1,
            price2,
            img,
            year,
            time:moment().format('lll'),
            email,
            about
        }

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

    return (
        <div>
            <div className='my-10'>
            <h1 className='text-4xl font-bold my-10 text-center'>Add Services</h1>
            <p className='text-center'>Add your services here</p>
            <form onSubmit={handlePro}>
                <div className='card-body w-4/5 lg:w-1/3 bg-base-100 shadow-2xl rounded-lg m-auto'>

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
                        <input name="proYear" type="number" placeholder="Year of use" className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>

                    <div className="form-control">
                        <input name="proImg" type="text" placeholder="Photo URL" className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>

                    <div className="form-control">
                        <textarea name="about" className="textarea textarea-bordered backdrop-blur-sm bg-white/30" placeholder="Details Please" required></textarea>
                    </div>

                    <button className='btn btn-info' type='submit'>Add Product</button>
                </div>
            </form>

            <div>
            </div>
            
        </div>
        </div>
    );
};

export default AddPro;