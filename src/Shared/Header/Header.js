import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import './Header.css'

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }



   
    return (
        <div className='bg-green-500'>
            <div className="container navbar m-auto px-4 lg:px-20">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="nav menu-compact dropdown-content mt-3 p-2 shadow bg-green-500 rounded-box w-52 text-center py-5">
                        <li className='mb-5'><NavLink to='/' className={({isActive})=> isActive ? 'active' : undefined} end>Home</NavLink></li>
                        <li className='mb-5'><NavLink to='/categories'>Categories</NavLink></li>
                        <li className=''><NavLink to='/blogs'>Blogs</NavLink></li>
                        {user?.uid ?
                        <>
                            <Link to={'/dashboard'}><button className="btn btn-xs lg:btn bg-green-500 shadow-xl mx-0.5 lg:mx-5 my-5">DashBoard</button></Link>
                            <button onClick={handleLogOut} className="btn btn-xs lg:btn bg-green-500 shadow-xl">Log Out</button>
                        </>
                        : <Link to='/login'><button className="btn bg-green-500 shadow-xl">Log In</button></Link>
                        }
                    </ul>
                    </div>
                    <NavLink className='text-2xl text-gray-900 font-semibold flex items-center' to='/'>
                        <p className='text-xl md:text-2xl lg:text-2xl text-white ml-1.5 lg:ml-2.5'>E-Mela</p>
                    </NavLink>
                </div>

                <div className="navbar-center hidden lg:flex text-white">
                    <ul className="nav menu-horizontal">
                        <li className='ml-5'><NavLink to='/' className={({isActive})=> isActive ? 'active' : undefined} end>Home</NavLink></li>
                        <li className='ml-5'><NavLink to='/categories'>Categories</NavLink></li>
                        <li className='ml-5'><NavLink to='/blogs'>Blogs</NavLink></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <NavLink className="mr-0 lg:mr-12">
                        <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="">{user?.displayName}</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 lg:w-52 ">
                        {user?.uid ?
        
                        <>
                        <li className='mb-1'><NavLink to='/addproducts' className='bg-green-500'>Add Products</NavLink></li>
                        <li className=''><NavLink to='/myproducts' className='bg-green-500'>My Products</NavLink></li>
                        </>
                        : 
                        <>
                        
                        </>
                        }
                        </ul>
                        </div>
                    </NavLink>
                    <NavLink className="flex items-center">
                    {user?.uid ?
                        <>
                            <Link to={'/dashboard'}><button className="btn btn-xs lg:btn bg-green-500 shadow-xl mx-0.5 lg:mx-5 hidden lg:block">DashBoard</button></Link>
                            <button onClick={handleLogOut} className="btn btn-xs lg:btn bg-green-500 shadow-xl hidden lg:block">Log Out</button>
                        </>
                        : <Link to='/login'><button className="btn bg-green-500 shadow-xl">Log In</button></Link>
                    }
                    </NavLink>
                </div>

                <label htmlFor="dash-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                
            </div>
        </div>
    );
};

export default Header;