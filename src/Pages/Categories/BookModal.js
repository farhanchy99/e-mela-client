import React, { useContext} from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const BookModal = ({modal}) => {
    const{user} = useContext(AuthContext)
    const {title, image, price1} = modal
    const navigate = useNavigate();

    const handleBook = event =>{
        event.preventDefault();
        const form = event.target;
        const userName = user?.displayName || 'unregistered';
        const email = user?.email || 'unregistered';
        const location = form.bookLocation.value;
        const phone = form.bookPhone.value;


        const addOrders = {
            productName: title,
            userName,
            location,
            img: image,
            price: price1,
            phone,
            email
        }

        fetch('http://localhost:5000/myorders', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(addOrders)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                swal({
                    title: "Order Added Successfully",
                    button: "OK",
                    icon: "success"
                  });
                form.reset();
                navigate('/categories')
            }
        })
        .catch(err => console.error(err));
    }


    return (
        <>
        <input type="checkbox" id="modalBook" className="modal-toggle" />
        <div className="modal">
        <div className="modal-box relative">
            <label htmlFor="modalBook" className="btn btn-sm btn-circle bg-green-500 absolute right-2 top-2">✕</label>
            <form onSubmit={handleBook}>
                <div className='card-body bg-base-100 m-auto'>

                    <div className='w-1/2'>
                        <h1 className='text-xl text-black font-bold mb-5'>BOOK NOW</h1>   
                    </div>
                    <div>
                        <h1 className='text-2xl text-green-500 font-bold'>{title}</h1>
                        <h1 className='text-lg text-black font-bold mb-5'>Price: {price1}</h1>
                    </div>

                    <div className='form-control'>
                        <input name="bookUser" type="text" defaultValue={user?.displayName} className="input input-bordered w-full backdrop-blur-sm bg-white/30" disabled/>
                    </div>

                    <div className='form-control'>
                        <input name="bookEmail" type="email" defaultValue={user?.email} placeholder="E-Mail" className="input input-bordered w-full backdrop-blur-sm bg-white/30" disabled/>
                    </div>

                    <div className='form-control'>
                        <input name="bookPhone" type="tel" placeholder="Phone Number" className="input input-bordered w-full backdrop-blur-sm bg-white/30" pattern="[0-9]{11}" required/>
                    </div>

                    <div className='form-control'>
                        <input name="bookLocation" type="text" placeholder="Location" className="input input-bordered w-full backdrop-blur-sm bg-white/30" required/>
                    </div>

                    <button className='btn bg-green-500 mt-5' type='submit'>Add Product</button>
                </div>
            </form>
        </div>
        </div>
        </>
    );
};

export default BookModal;