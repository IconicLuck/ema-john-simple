import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';

const Login = () => {

    const [error, setError] = useState('')

    const [success, setSuccess] = useState('')

    const [show, setShow] = useState(false)

    const { signIn } = useContext(AuthContext)

    const navigate = useNavigate()

    const location = useLocation()

    const from = location?.state?.from?.pathname || '/'
    // console.log(from)

    const handleLogin = event => {
        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const password = form.password.value

        setError('')
        setSuccess('')

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                form.reset()
                setSuccess('User has successfully logged in')
                setError('')
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }

    return (
        <div className='mt-20'>
            <form onSubmit={handleLogin} className='w-[500px] mx-auto border-2 rounded-lg p-10 shadow-xl'>
                <h1 className='text-5xl text-center font-semibold mb-7'>Please Login</h1>
                <div className='mb-5'>
                    <label className='block mb-2 font-semibold' htmlFor="email">Email</label>
                    <input className='border-2 w-full rounded-lg h-[55px] text-xl' type="email" name="email" id="email" required />
                </div>
                <div className='mb-10'>
                    <label className='block mb-2 font-semibold' htmlFor="password">Password</label>
                    <input className='border-2 w-full rounded-lg h-[55px] text-xl' type={show ? "text" : "password"} name="password" id="password" required />
                    <p onClick={() => setShow(!show)}>
                        <small>
                            {show ?
                                <span className='cursor-pointer'>Hide Password</span> :
                                <span className='cursor-pointer'>Show Password</span>}
                        </small>
                    </p>
                </div>
                <input className='text-xl font-semibold bg-[#FF9900] bg-opacity-30 hover:bg-opacity-70 ease-in-out duration-200 w-full py-4 rounded-lg' type="submit" value="Login" />
                <p className='text-center mt-2 font-semibold'>New to Ema-John? <Link className='text-[#FF9900]' to='/sign-up'>Create New Account</Link></p>
            </form>
            {error && <h4 className='text-red-500 font-semibold text-2xl text-center'>Error: {error}</h4>}
            {success && <h4 className='text-green-500 font-semibold text-2xl text-center'>{success}</h4>}
        </div>
    );
};

export default Login;