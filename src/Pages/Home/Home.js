import React from 'react';
import { Link } from 'react-router-dom';
import { faSearch, faCircleCheck, faBoxOpen, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banner from '../../Shared/Banner/Banner';
import CategoryList from '../../CategoryList/CategoryList';
import Advertise from '../../Advertise/Advertise';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='w-11/12 m-auto'>
                <p className='text-xl text-black font-bold mt-10'>ADVERTISEMENTS</p>
                <h1 className='text-3xl text-green-500 font-bold mb-10'>Sponsored Products</h1>
                <Advertise></Advertise>
            </div>

            <div className='my-10 bg-green-500 p-5'>
                <div className='w-11/12 m-auto text-white'>
                <h1 className='text-xl text-center font-bold mt-10'>Get the guaranteed best price for your phone in 4 easy steps</h1>
                <div className='grid grid-cols-4 gap-4 my-10'>
                    <div className='flex items-center'>
                        <div>
                            <FontAwesomeIcon icon={faSearch} className="mr-5 text-4xl font-bold"></FontAwesomeIcon>
                        </div>
                        <div>
                            <h1 className='text-xl font-bold'>Search for your device</h1>
                            <p>Use our search box to find your mobile or tablet</p>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <div>
                            <FontAwesomeIcon icon={faCircleCheck} className="mr-5 text-4xl font-bold"></FontAwesomeIcon>
                        </div>
                        <div>
                            <h1 className='text-xl font-bold'>Select the best deal</h1>
                            <p>Compare prices so you get the GUARANTEED best deal</p>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <div>
                            <FontAwesomeIcon icon={faBoxOpen} className="mr-5 text-4xl font-bold"></FontAwesomeIcon>
                        </div>
                        <div>
                            <h1 className='text-xl font-bold'>Post your device</h1>
                            <p>Choose which recycler to sell your device to then post it to them</p>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <div>
                            <FontAwesomeIcon icon={faCircleDollarToSlot} className="mr-5 text-4xl font-bold"></FontAwesomeIcon>
                        </div>
                        <div>
                            <h1 className='text-xl font-bold'>Get your cash</h1>
                            <p>Sit back and wait for your cash</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div className='w-11/12 m-auto my-10'>
                <p className='text-xl text-black font-bold mt-10'>CATEGORIES</p>
                <h1 className='text-3xl text-green-500 font-bold'>Trending Brands</h1>
                <CategoryList></CategoryList>
            </div>
        </div>
    );
};

export default Home;