import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryList from '../../CategoryList/CategoryList';

const Categories = () => {
    const {name} = useLoaderData()
    return (
        <div className='w-11/12 m-auto my-10'>
            <CategoryList></CategoryList>
        </div>
    );
};

export default Categories;