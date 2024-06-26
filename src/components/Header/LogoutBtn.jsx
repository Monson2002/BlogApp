import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <button className='inline-bock px-6 py-1 duration-200 text-xl text-white hover:text-slate-900  hover:bg-blue-100 rounded-sm w-full'
      onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn;