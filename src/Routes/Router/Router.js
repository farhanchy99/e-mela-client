
import Main from "../../Layout/Main";
import AddProducts from "../../Pages/AddProducts/AddProducts";
import Blogs from "../../Pages/Blogs/Blogs";
import Categories from "../../Pages/Categories/Categories";
import PerCat from "../../Pages/Categories/PerCat";
import Allbuyers from "../../Pages/DashBoard/Allbuyers/Allbuyers";
import Allsellers from "../../Pages/DashBoard/Allsellers/Allsellers";
import DashBoard from "../../Pages/DashBoard/DashBoard";
import MyOrders from "../../Pages/DashBoard/MyOrders/MyOrders";
import Reporteditems from "../../Pages/DashBoard/Reporteditems/Reporteditems";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/LogIn/Login";
import Register from "../../Pages/Register/Register";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import DashLayout from "../../Layout/DashLayout/DashLayout";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import SellerRoutes from "../SellerRoutes/SellerRoutes";
import MyPro from "../../Pages/DashBoard/MyPro/MyPro";


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
                path:'/dashboard',
                element: <DashBoard></DashBoard>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoutes><Allsellers></Allsellers></AdminRoutes>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoutes><Allbuyers></Allbuyers></AdminRoutes>
            },
            {
                path: '/dashboard/reporteditems',
                element: <AdminRoutes><Reporteditems></Reporteditems></AdminRoutes>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoutes><MyPro></MyPro></SellerRoutes>
            },
            {
                path: '/dashboard/addproducts',
                element: <SellerRoutes><AddProducts></AddProducts></SellerRoutes>
            },
        ]
    }
])

export default router;