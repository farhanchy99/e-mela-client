import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import logo from '../../assets/logo.png'
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
                        <h1 className='text-white font-bold text-xl mb-5'>{user?.displayName}</h1>
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
                    <NavLink className='text-2xl text-gray-900 font-semibold hidden lg:flex items-center' to='/'>
                        <img src={logo} alt="logo" className='w-20 d-block m-auto rounded-full'/>
                        <p className='text-xl md:text-2xl lg:text-4xl text-white ml-1.5 lg:ml-2.5'>E<span className='text-yellow-500'>-</span>Mela</p>
                    </NavLink>
                </div>

                <div className="navbar-center lg:hidden text-white">
                    <NavLink className='text-2xl text-gray-900 font-semibold flex items-center' to='/'>
                        <img src={logo} alt="logo" className='w-12 d-block m-auto rounded-full'/>
                        <p className='text-xl md:text-2xl lg:text-4xl text-white ml-1.5 lg:ml-2.5'>E-Mela</p>
                    </NavLink>
                </div>

                <div className="navbar-center hidden lg:flex text-white font-bold">
                    <ul className="nav menu-horizontal">
                        <li className='ml-5'><NavLink to='/' className={({isActive})=> isActive ? 'active' : undefined} end>Home</NavLink></li>
                        <li className='ml-5'><NavLink to='/categories'>Categories</NavLink></li>
                        <li className='ml-5'><NavLink to='/blogs'>Blogs</NavLink></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <h1 className='text-white font-bold text-xl hidden lg:block'>{user?.displayName}</h1>
                    <NavLink className="flex items-center">
                    {user?.uid ?
                        <>
                            <Link to={'/dashboard'}><button className="btn btn-xs lg:btn bg-green-500 shadow-xl mx-0.5 lg:mx-5 hidden lg:block">DashBoard</button></Link>
                            <button onClick={handleLogOut} className="btn btn-xs lg:btn bg-green-500 shadow-xl hidden lg:block">Log Out</button>
                        </>
                        : 
                        <>
                            <Link to='/login'><button className="btn bg-green-500 shadow-xl">Log In</button></Link>
                        </>
                    }
                    </NavLink>
                    
                    <label htmlFor="dash-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
                
            </div>
        </div>
    );
};

export default Header;