import React, { useEffect, useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'

function Header() {
  const [userName, setUserName] = useState("");
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    // {
    //   name: "All Posts",
    //   slug: "/all-posts",
    //   active: authStatus,
    // },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  useEffect(() => {
    fetchUserName();
  },[userName])

  const fetchUserName = async () => {
    const userResponse = await authService.getCurrentUser()
    setUserName(userResponse.name);
    console.log(userResponse.name);
  }

  return (
    <header className='py-4 shadow bg-slate-900'>
      <Container>
        <nav className='flex justify-between items-center'>
          <div className='flex justify-center items-center m-4'>
            <Logo />
          </div>
          <ul className='flex'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='mx-2'>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 text-xl text-white hover:text-slate-900  hover:bg-blue-100 rounded-full w-full'
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          {/* {userName.length > 0 
          ? (<div className='flex justify-center items-center text-white text-xl absolute right-20'>
            Welcome {userName}
          </div>)
          : null} */}
        </nav>
      </Container>
    </header>
  )
}

export default Header