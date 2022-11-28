import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';

const CategoryList = () => {
    const {data: catlists =[]} = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('https://resale-web-server-rho.vercel.app/categories')
        .then(res => res.json())
    })

    useTitle('Products');
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-10'>
            {
                catlists.map(catlist =>
                    <div className="card m-auto card-compact w-64 bg-base-100 shadow-xl" key={catlist._id}>
                    <Link to={`/categories/${catlist._id}`}>
                        <figure className='h-52 p-5'><img src={catlist.img} alt="brands" /></figure>
                        <div className="divider px-10 my-0"></div> 
                        <div className="card-body">
                            <h2 className="text-center">{catlist.name}</h2>
                        </div>
                    </Link>
                    </div>
                )
            }
        </div>
    );
};

export default CategoryList;