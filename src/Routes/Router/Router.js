import DashLayout from "../../Layout/DashLayout";
import Main from "../../Layout/Main";
import AddPro from "../../Pages/AddPro/AddPro";
import AddProducts from "../../Pages/AddProducts/AddProducts";
import Blogs from "../../Pages/Blogs/Blogs";
import Categories from "../../Pages/Categories/Categories";
import PerCat from "../../Pages/Categories/PerCat";
import DashBoard from "../../Pages/DashBoard/DashBoard";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/LogIn/Login";
import MyOrders from "../../Pages/MyOrders/MyOrders";
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
                element: <PrivateRoutes><Categories></Categories></PrivateRoutes>,
                loader: () => fetch(`http://localhost:5000/categories`)
            },
            {
                path: '/categories/:id',
                element: <PrivateRoutes><PerCat></PerCat></PrivateRoutes>,
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
                element: <PrivateRoutes><AddProducts></AddProducts></PrivateRoutes>,
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
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashLayout></DashLayout></PrivateRoutes>,
        children:[
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>
            }
        ]
    }
])

export default router;