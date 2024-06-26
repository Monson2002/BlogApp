import { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import Loader from '../components/Loader';

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(true);

  useEffect(() => { 
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setLoader(false)
        setPosts(posts.documents)
      }
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
        <div className='gap-12'>
          {posts && posts.length && posts.length > 0
          ? (
            posts.map((post) => (
              <div key={post.$id} className='grid grid-cols-1'>
                <PostCard {...post} />
              </div>
            ))
          )
          : null}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts