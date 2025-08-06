import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800
    flex justify-between items-center px-4 h-20 z-0'>
        <div className="logo font-bold text-3xl text-white">
            <span className='text-green-600'>&lt;</span>
            PASSWORD
            <span className='text-green-600'>mg/&gt;</span>
            </div>
        <ul>
            <li className='flex gap-4 text-white'>
                <a className='hover:font-bold'  href="/">Home</a>
                <a className='hover:font-bold'  href="#">About</a>
                <a className='hover:font-bold'  href="#">Contact</a>
            </li>
        </ul>

    </nav>
  )
}

export default Navbar 