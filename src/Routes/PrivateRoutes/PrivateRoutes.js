import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const PrivateRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
        <div className='flex justify-center items-center'>
            <button className="btn bg-green-500 loading m-auto">loading</button>
        </div>
      );
      }
  
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
    }
    return children;
};

export default PrivateRoutes;