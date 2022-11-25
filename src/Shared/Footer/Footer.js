import React from 'react';
import { Link } from 'react-router-dom';
import { faTwitter, faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-slate-800 text-green-500 justify-items-center">
                <div>
                    
                    <h1 className="text-2xl font-bold text-white">E-Mela</h1>
                    <p className="text-lg text-white">Mobile Resale Market</p>
                    <p>created by Farhan Chowdhury @2022</p>
                </div>
                <div>
                    <span className="text-xl font-bold text-white">Menus</span> 
                    <Link className="link link-hover" to={'/blogs'}>Blogs</Link> 
                    <Link className="link link-hover" to={'/categories'}>Categories</Link> 
                    <Link className="link link-hover" to={'/register'}>Register</Link> 
                    <Link className="link link-hover" to={'/'}>Home</Link> 
                </div> 
                <div>
                    <span className="text-xl font-bold text-white">Social</span> 
                    <div className="grid grid-flow-col gap-4">
                        <Link to={'/'} className="text-2xl"><FontAwesomeIcon icon={faTwitter} className="mr-5"></FontAwesomeIcon></Link>
                        <Link to={'/'} className="text-2xl"><FontAwesomeIcon icon={faFacebookF} className="mr-5"></FontAwesomeIcon></Link>
                        <Link to={'/'} className="text-2xl"><FontAwesomeIcon icon={faYoutube} className="mr-5"></FontAwesomeIcon></Link>
                    </div>
                </div>                                                                                          
            </footer>
        </div>
    );
};

export default Footer;