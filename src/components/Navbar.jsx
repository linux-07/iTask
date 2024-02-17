import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-900 text-white py-4'>
        <div className="logo">
            <a href='/' className='font-bold text-xl mx-8'>iTask</a>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='hover:font-bold transition-all'><a href="/">Home</a></li>
        <li className='hover:font-bold transition-all'><a href="/">Your Tasks</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
