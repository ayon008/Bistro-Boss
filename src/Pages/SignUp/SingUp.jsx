import Lottie from 'lottie-react';
import animationData from '../../assets/Animation - 1712071258645.json'
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';

const SingUp = () => {
    // React Hook from
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { googleLogin, signUp, updateUserProfile, logOut } = useAuth();

    const navigate = useNavigate();

    const onSubmit = data => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        signUp(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateUserProfile(name)
                    .then(result => {
                        axios.post('http://localhost:5000/user', { name: user?.displayName, email: user.email })
                            .then(response => {
                                Swal.fire({
                                    title: 'Sign Up Successful',
                                    showClass: {
                                        popup: 'animate__animated animate__fadeInDown'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__fadeOutUp'
                                    }
                                });
                                logOut();
                                navigate('/login');
                            })
                    })
            })
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                axios.post('/user', { name: user?.displayName, email: user.email })
                console.log(user);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='login min-h-screen p-10'>
            <div className='h-full flex flex-row-reverse border-2 border-gray-300 shadow-right-bottom'>
                <div className='w-1/2 h-full'>
                    <Lottie className='w-full h-[500px]' animationData={animationData} loop={true} />
                </div>
                <div className="h-full w-1/2">
                    <div className="card shrink-0 w-full max-w-sm h-fit m-auto">
                        <h3 className="text-2xl font-bold uppercase text-center pt-4">Sign Up</h3>
                        <form className="card-body p-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-semibold">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className={`input input-bordered ${errors.name ? 'border-red-500' : ''}`}
                                    {...register('name', { required: 'Name is required' })}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-semibold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={`input input-bordered ${errors.email ? 'border-red-500' : ''}`}
                                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg font-semibold">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={`input input-bordered ${errors.password ? 'border-red-500' : ''}`}
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>

                            <div className="form-control mt-2">
                                <button type="submit" className="btn btn-primary bg-[#D1A054B3] text-white border-none">Sign Up</button>
                            </div>

                            <div>
                                <p className='text-center mt-6 text-[#D1A054B3]'>Already registered?
                                    <Link to="/login" className='font-bold'> Go to log in</Link>
                                </p>
                                <p className="mt-4 font-semibold text-center">Or sign in with</p>
                                <div className='flex items-center gap-6 mt-4 w-fit mx-auto'>
                                    <FaFacebook size={24} />
                                    <FaGoogle className='cursor-pointer' onClick={handleGoogleLogin} size={24} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingUp;