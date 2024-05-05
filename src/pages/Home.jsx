import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import Loader from '../components/Loader';

function Home() {
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setLoader(false);
        setPosts(posts.documents)
      }
      setLoader(false);
    })
  }, [])

  if (loader) {
    return (
      <div className='flex justify-center items-center'>
        <Loader/>
      </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex justify-center items-center gap-12'>
          {posts && posts.length 
          ? posts.map((post) => (
            <div key={post.$id} className=''>
              <PostCard {...post} />
            </div>
          ))
          : posts.length === 0 
          ? (
            <div className='flex justify-center items-center text-slate-800 text-2xl'>
              Login to Read Posts...
            </div>
          )
          : (
            <Loader/>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Home