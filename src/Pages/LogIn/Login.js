import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
 

const Login = () => {
    
    const { register, formState: {errors}, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const {logIn} = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = data => {
        console.log(data)
        setLoginError('');
        logIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, {replace: true});
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }

    return (
        <div>
            <div className="hero min-h-screen my-10">
            <div className="hero-content flex-col lg:flex-row-reverse w-4/5 lg:w-1/2 bg-base-100 shadow-2xl rounded-lg">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-green-500">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm">
                <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", {required: "Email is Required"})} placeholder="email" className="input input-bordered" />
                    {errors.email && <p role="alert">{errors.email?.message}</p>}

                    </div>

                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", {required: "Password is Required"})} placeholder="password" className="input input-bordered" />
                    {errors.password && <p role="alert">{errors.password?.message}</p>}
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn bg-green-500">Login</button>
                    </div>
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                    
                    <label className="label">
                            <p className=''>Still not have account? <Link to={'/register'} className="link link-hover">Register Now</Link></p>
                    </label>
                </form>
                <div className='divider'>OR</div>
                <button className='btn bg-green-500'>Continue with Google</button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;