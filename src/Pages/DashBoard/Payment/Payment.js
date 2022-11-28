import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import CheckOutForm from './CheckOutForm';

const Payment = () => {
    const orders = useLoaderData()
    const {productName, price} = orders;
    const navigation = useNavigation();

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
    if(navigation.state === "loading"){
        return <Loading></Loading>
    }
    return (
        <div className='w-11/12 m-auto'>
            <p className='text-xl text-black font-bold mt-10'>PAYMENTS</p>
            <h1 className='text-3xl text-green-500 font-bold'>Add Your Payments For {productName}.</h1>
            <p>Please Pay <span className='font-bold'>${price}</span> </p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm
                        orders={orders}
                    />
                </Elements>
            </div>
        </div>
        
    );
};

export default Payment;