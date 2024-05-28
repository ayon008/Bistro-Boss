import Lottie from 'lottie-react';
import animationData from '../../assets/Animation - 1712071258645.json';
import '../Login/login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa6';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';

const Login = () => {

    const { signIn, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.state?.from || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(pathName)
            })
    };


    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                axios.post('http://localhost:5000/user', { name: user?.displayName, email: user.email })
                console.log(user);
                navigate(pathName);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const [error, setError] = useState(true);
    
    const handleReCaptcha = e => {
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value);
        if (validateCaptcha(user_captcha_value) == true) {
            setError(false);
        }

        else {
            setError(true);
        }
    }

    return (
        <div className='login min-h-screen p-10'>
            <div className='h-fit m-auto flex border-2 border-gray-300 shadow-right-bottom'>
                <div className='w-1/2 h-full'>
                    <Lottie className='w-full h-[500px]' animationData={animationData} loop={true} />
                </div>
                <div className="h-full w-1/2">
                    <div className="card shrink-0 w-full max-w-sm h-full m-auto">
                        <div className="card-body">
                            <h3 className="text-2xl font-bold uppercase text-center pt-4">Log In</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-semibold">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="email"
                                        className="input input-bordered"
                                        {...register('email', { required: "Email is required" })}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg font-semibold">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                        {...register('password', {
                                            required: "Password is required",
                                        })}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <LoadCanvasTemplate />
                                <div className="form-control">
                                    <input
                                        type="text"
                                        placeholder="captcha"
                                        className="input input-bordered"
                                        onBlur={handleReCaptcha}
                                    />
                                    {errors.captcha && <p className="text-red-500 text-sm">{errors.captcha.message}</p>}
                                </div>
                                <div className="form-control mt-2">
                                    <button disabled={error} className="btn btn-primary bg-[#D1A054B3] text-white border-none">Sign In</button>
                                </div>
                            </form>
                            <div>
                                <p className='text-center mt-6 text-[#D1A054B3]'>New here? <Link to="/signup" className='font-bold'>Create a New Account</Link></p>
                                <p className="mt-4 font-semibold text-center">Or sign in with</p>
                                <div className='flex items-center gap-6 mt-4 w-fit mx-auto'>
                                    <FaFacebook size={24} />
                                    <FaGoogle className='cursor-pointer' onClick={handleGoogleLogin} size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;