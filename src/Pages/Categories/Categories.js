import React from 'react';
import CategoryList from '../../CategoryList/CategoryList';

const Categories = () => {
    return (
        <div className='w-11/12 m-auto my-10'>
        <p className='text-xl text-black font-bold mt-10'>CATEGORIES</p>
        <h1 className='text-3xl text-green-500 font-bold'>Choose Your Brands</h1>
            <CategoryList></CategoryList>
            
        </div>
    );
};

export default Categories;