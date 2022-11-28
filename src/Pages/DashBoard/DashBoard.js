import React from 'react';
import useTitle from '../../hooks/useTitle';

const DashBoard = () => {
    useTitle('Dashboard');
    return (
        <div className='w-11/12 m-auto mt-36'>
            <p className='text-xl text-black font-bold mt-10'>DASHBOARD</p>
            <h1 className='text-5xl text-green-500 font-bold'>Welcome To The DashBoard!</h1>
        </div>
    );
};

export default DashBoard;