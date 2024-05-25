import Logo from '../Logo'

function Footer() {
  return (
    <section className="overflow-hidden py-1 bg-slate-900 border border-t-2 border-t-black">
      <div className="inline-flex items-center">
        <Logo width="100px" className='text-white' />
      </div>
      <div>
        <p className="text-md text-gray-200">
        Enhanced and Modified with &#x2665; by Monson
        </p>
      </div>
    </section>
  )
}

export default Footer