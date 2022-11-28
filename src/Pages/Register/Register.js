import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import useTitle from '../../hooks/useTitle';

const Register = () => {
    const { register, formState: {errors}, handleSubmit } = useForm();
    const [error, setError] = useState('')
    const [role, setRole] = useState();
    const {createUser, updateUserProfile, providerLogin} = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname|| "/";

    const handleGoogleSignIn = () =>{
        providerLogin(googleProvider)
        .then((data)=>{
            navigate(from, {replace: true})
            setError("");
            const user ={ email: data.user.email, displayName: data.user.displayName, photoURL: data.user.photoURL, role: "buyer"};
              socialLogin(user)
        })
        .catch((error) => {
            swal({
                title: "Unsuccessfully Log In",
                button: "OK",
                icon: "error"
              });
            setError(error);
        });
    }

    const handleGitHubSignIn = () =>{
        providerLogin(gitHubProvider)
        .then(result=>{
            const user = result.user;
            swal({
                title: "Successfully Login",
                button: "OK",
                icon: "success"
              });
            setError("");
            navigate(from, {replace: true});
            console.log(user);
        })
        .catch(error => console.error(error))
    }

    const socialLogin = (user) =>{
        fetch('https://resale-web-server-rho.vercel.app/users', {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            navigate(from, {replace: true})
            swal({
                title: "Successfully Registered",
                button: "OK",
                icon: "success"
              });
            console.log(data);
        })
    }

    const handleSignIn = (data) => {
        setError('');

        createUser(data.email, data.password, data.photoURL, data.displayName, data.role)
        .then( result => {
            const user = result.user;
            console.log(user);
            swal({
                title: "Successfully Registered",
                button: "OK",
                icon: "success"
              });
            const profile ={ displayName: data.displayName, photoURL: data.photoURL};
            updateUserProfile(profile)
            .then(()=>{
                saveUser(data.email, data.password, data.photoURL, data.displayName, data.role)
            })
            .catch( e => console.error(e));
        })
        .catch(e => {
            swal({
                title: "Not Registered",
                button: "OK",
                icon: "error"
              });
            setError(e.message);
        })
    }

    const saveUser = (email, password, photoURL, displayName, role) =>{
        const userData = {email, password, photoURL, displayName, role};
        fetch('https://resale-web-server-rho.vercel.app/users', {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            navigate("/");
        })
    }
    useTitle('Register');
    return (
        <div>
            <div>
                <div className="hero min-h-screen my-10">
                <div className="hero-content flex-col lg:flex-row-reverse w-4/5 lg:w-1/2 backdrop-blur-sm bg-white/30 p-0 shadow-2xl rounded-lg py-10">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-green-500">Register now!</h1>
                        <p className="text-lg font-bold mt-5">JOIN WITH US</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm">
                    <form onSubmit={handleSubmit(handleSignIn)} className="card-body">
                        <h1 className="text-xl font-bold text-green-500">Join As:</h1>
                        <div className='w-1/2 flex mr-4'>
                            <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Buyer</span> 
                                <input type="radio" name="role" className="radio checked:bg-green-500" {...register("role", {required: true})} value="Buyer" onChange={e=> setRole(e.target.value)}/>
                            </label>
                            </div>
                            <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Seller</span> 
                                <input type="radio" name="role" className="radio checked:bg-green-500" {...register("role", {required: true})} value="Seller" onChange={e=> setRole(e.target.value)}/>
                            </label>
                            </div>  
                        </div>

                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <input name="displayName" {...register("displayName", { required: "Name is Required" })} type="text" placeholder="user name" className="input input-bordered text-black" />
                        {errors.name && <p role="alert">{errors.name?.message}</p>}
                        </div>

                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                            <input {...register("photoURL", {required: "PhotoURL is Required"})} type="text" placeholder="Photo url" className="input input-bordered text-black" />
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
                            <button className="btn bg-green-500 text-white">Register</button>
                        </div>
                        {error && <p className='text-red-600'>{error}</p>}
                        <p>Already have Account?<Link to={'/login'} className="text-lime-300"> Login</Link></p>
                        
                        <div className='divider'>OR</div>
                        <button onClick={handleGoogleSignIn} className='btn bg-green-500'>Continue with Google</button> 
                        <button onClick={handleGitHubSignIn} className='btn bg-green-500'>Continue with GitHub</button>   
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Register;