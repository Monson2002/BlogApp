import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"
import Loader from './Loader'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false);

  const login = async (data) => {
    setError("")
    setLoader(true);
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData));
        setLoader(false);
        navigate("/")
      }
    } catch (error) {
      setLoader(false);
      setError(error.message)
    }
    window.location.reload();
  }

  if (loader) {
    return (
      <div className='flex justify-center items-center'>
        <Loader/>
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center w-full my-8'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-4 border border-black/10`}>
        <div className="flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-lg font-bold leading-tight">Sign in to your account</h2>
        <p className="text-center text-sm text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='my-4'>
          <div className='space-y-5'>
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login