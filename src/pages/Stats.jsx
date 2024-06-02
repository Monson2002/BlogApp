import { useEffect } from 'react'
import { Container } from '../components'
import service from '../appwrite/config'
import authService from '../appwrite/auth';
import usersCount from '../node';
import { useReducer } from 'react';
import Loader from '../components/Loader';

const reducer = (state, action) => {
  switch (action.type) {
    case 'BLOG_COUNT':
      return {
        ...state,
        blogCount: action.blogCount
      }

    case 'CURRENT_USER':
      return {
        ...state,
        username: action.username,
        email: action.email
      }

    case 'LOADER':
      return {
        ...state,
        loader: action.loader
      }

    default:
      break;
  }
}

const initialState = {
  blogCount: 0,
  username: '',
  email: '',
  loader: true
}

function Stats() {

  console.log(usersCount());

  const [state, dispatch] = useReducer(reducer, initialState);

  const getBlogCount = async () => {
    const response = await service.listDocuments();
    const blogCount = response.total
    dispatch({ type: 'BLOG_COUNT', blogCount: blogCount })
  }

  const getCurrentUser = async () => {
    const response = await authService.getCurrentUser();
    const name = response.name;
    const email = response.email;
    dispatch({ type: 'CURRENT_USER', username: name, email: email })
  }
  
  useEffect(() => {
    const fetchDetails = async () => {
      await getCurrentUser();
      await getBlogCount();
      dispatch({ type: 'LOADER', loader: false })
    }
    fetchDetails();
  }, [])

  return (
    <div className=''>
      {state.loader && <Loader />}  
      {state.loader === false
      && <Container>
          <div className='w-1/3 h-[75vh] p-4 m-4 flex flex-col justify-evenly'>
            <h1 className='text-4xl font-semibold'>Hello, <h1 className='font-thin italic'>{state.username}</h1></h1>
            <div className='flex justify-between'>
              <div className=''>
                <p className='text-2xl'>Registered Email</p>
                <p className='text-2xl'>{state.email}</p>
              </div>

            </div>
          </div>
          <div className='w-2/3 h-[75vh]'>
            <div className='flex justify-between mx-6'>
              <p className='text-4xl font-semibold m-4'>Blogs: {state.blogCount}</p>
              <p className='text-4xl font-semibold m-4'>Users: {usersCount.total}</p>
            </div>
            <div className='grid grid-cols-2 gap-8 overflow-scroll overflow-x-hidden scroll-smooth' style={{ 'height': 'calc(100vh - 40vh)' }}>
              {/* {usersCount.users.map((user, index) => {
                return (
                  <div key={index} className='bg-slate-300 rounded-md text-left p-4 m-4 border-red-300 hover:scale-105 transition-all'>
                    <p className='font-semibold'>Name: <span className='font-normal'>{user.name}</span></p>
                    <p className='font-semibold'>E-mail: <span className='font-normal'>{user.name}</span></p>
                    <p className='font-semibold'>Registered On: <span className='font-normal'>{new Date(user.$createdAt).toString()}</span></p>
                  </div>
                )
              })} */}
            </div>
          </div>
        </Container>}
    </div>
  )
}

export default Stats