import Main from "../../Layout/Main";
import AddPro from "../../Pages/AddPro/AddPro";
import Blogs from "../../Pages/Blogs/Blogs";
import Categories from "../../Pages/Categories/Categories";
import PerCat from "../../Pages/Categories/PerCat";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/LogIn/Login";
import MyPro from "../../Pages/MyPro/MyPro";
import Register from "../../Pages/Register/Register";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";


const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/categories',
                element: <Categories></Categories>,
                loader: () => fetch(`http://localhost:5000/categories`)
            },
            {
                path: '/categories/:id',
                element: <PerCat></PerCat>,
                loader: ({params}) => fetch(`http://localhost:5000/categories/${params.id}`)
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/addproducts',
                element: <PrivateRoutes><AddPro></AddPro></PrivateRoutes>,
            },
            {
                path: '/myproducts',
                element: <PrivateRoutes><MyPro></MyPro></PrivateRoutes>,
            },
            {
                path: "*",
                element: (
                  <div className="pt-16 block m-auto text-center">
                    <h1 className='text-6xl text-amber-400 font-bold'>404</h1>
                    <h1 className="text-5xl">Sorry Page not Found</h1>
                    <button className="btn btn-square loading mt-5 bg-amber-400"></button>
                  </div>
                ),
            }
        ]
    }
])

export default router;