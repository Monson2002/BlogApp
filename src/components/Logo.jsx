import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className='flex justify-center items-center scale-150'>
      <i className="fa-brands fa-microblog text-white"></i>
    </div>
  )
}

export default Logo