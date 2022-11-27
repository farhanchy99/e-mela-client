import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';
import Header from '../../Shared/Header/Header';
import '../DashLayout/DashLayout.css'

const DashLayout = () => {
    const {user} = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)

    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
            <input id="dash-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet></Outlet>
            </div> 
            <div className="drawer-side">
                <label htmlFor="dash-drawer" className="drawer-overlay"></label> 
                <ul className="menu nav p-4 w-80 bg-slate-800 text-white font-bold">
                    {isAdmin && 
                    <>
                    <li><NavLink to={'/dashboard/allsellers'} className={({isActive})=> isActive ? 'active' : undefined} end>All Sellers</NavLink></li>
                    <li><NavLink to={'/dashboard/allbuyers'} className="mt-5">All Buyers</NavLink></li>
                    <li><NavLink to={'/dashboard/reporteditems'} className="mt-5">Reported Items</NavLink></li>
                    </>
                    }

                
                <li><NavLink to={'/dashboard/myorders'} className="mt-5">My Orders</NavLink></li>

                {isSeller && 
                <>
                <li><NavLink to={'/dashboard/myproducts'} className="mt-5">My Products</NavLink></li>
                <li><NavLink to={'/dashboard/addproducts'} className="mt-5">Add Products</NavLink></li>
                </>
                }
                </ul>
            
            </div>
            </div>
        </div>
    );
};

export default DashLayout;