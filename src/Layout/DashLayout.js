import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../Shared/Header/Header';

const DashLayout = () => {
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
                <ul className="menu p-4 w-80 bg-slate-800 text-white font-bold">
                <li><Link>All Sellers</Link></li>
                <li><Link>All Buyers</Link></li>
                <li><Link>Reported Items</Link></li>
                <li><Link>My Orders</Link></li>
                <li><Link>My Products</Link></li>
                <li><Link>Add Products</Link></li>
                </ul>
            
            </div>
            </div>
        </div>
    );
};

export default DashLayout;