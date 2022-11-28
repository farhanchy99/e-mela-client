import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'

const Slider = () => {
    return (
        <div className=''>
            <div className="hero min-h-screen" style={{ backgroundImage: `url("https://www.showmetech.com.br/wp-content/uploads//2022/04/iphone-11-and-13-3-1920x1024.webp")` }}>
            <div className="hero-overlay bg-gradient-to-r from-zinc-900"></div>
            <div className="w-full text-neutral-content px-5 md:px-10 lg:px-20">
                <div className="w-full md:w-4/5 lg:w-3/4">
                <h1 className="mb-5 text-xl md:text-6xl lg:text-6xl font-bold text-white">Welcome To E-Mela!</h1>
                <p className="mb-5 text-xl md:text-lg lg:text-2xl text-white w-full lg:w-1/2">Sell your mobile phone for cash! Get the most cash for your phone or tablet</p>
                <Link to={'/categories'}><button className="btn bg-green-500">Get Started</button></Link>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Slider;