import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex justify-center items-center gap-12'>
          {posts && posts.length && posts.length > 0 
          ? posts.map((post) => (
            <div key={post.$id} className=''>
              <PostCard {...post} />
            </div>
          ))
          : (
            <div className='text-2xl font-bold'>No posts to read...</div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Home