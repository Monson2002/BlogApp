import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([])
  useEffect(() => { }, [])
  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents)
    }
  })
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex justify-center items-center gap-12'>
          {posts && posts.length && posts.length > 0
          ? (
            posts.map((post) => (
              <div key={post.$id} className=''>
                <PostCard {...post} />
              </div>
            ))
          )
          : (
            <div className='text-2xl font-bold'>No posts to read...</div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts