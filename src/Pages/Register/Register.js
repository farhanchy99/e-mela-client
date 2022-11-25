import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Register = () => {
    const { register, formState: {errors}, handleSubmit } = useForm();
    const [error, setError] = useState('')
    const {createUser, updateUserProfile} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSignIn = (data) => {
        setError('');

        createUser(data.email, data.password, data.photoURL, data.name)
        .then( result => {
            const user = result.user;
            console.log(user);
            setError('');
            navigate("/");
            swal({
                title: "Successfully Registered",
                button: "OK",
                icon: "success"
              });
            const profile ={ displayName: data.name, photoURL: data.photoURL};
            updateUserProfile(profile)
            .then(()=>{})
            .catch( e => console.error(e));
        })
        .catch(e => {
            swal({
                title: "Unsuccessfully Registered",
                button: "OK",
                icon: "error"
              });
            setError(e.message);
        })
    }

    return (
        <div>
            <div>
                <div className="hero min-h-screen my-10">
                <div className="hero-content flex-col lg:flex-row-reverse w-4/5 lg:w-1/2 backdrop-blur-sm bg-white/30 p-0 shadow-2xl rounded-lg">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-green-500">Register now!</h1>
                        <p>Join With Us</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm">
                    <form onSubmit={handleSubmit(handleSignIn)} className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <input name="name" {...register("name", { required: "Name is Required" })} type="text" placeholder="user name" className="input input-bordered text-black" />
                        {errors.name && <p role="alert">{errors.name?.message}</p>}
                        </div>

                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input name="photoURL" type="text" placeholder="photo url" className="input input-bordered text-black" />
                        </div>

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
                            <button className="btn btn-info text-white">Register</button>
                        </div>
                        {error && <p className='text-red-600'>{error}</p>}
                        <p>Already have Account?<Link to={'/login'} className="text-lime-300"> Login</Link></p>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Register;