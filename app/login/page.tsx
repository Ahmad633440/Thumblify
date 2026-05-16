import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="absolute top-30 -z-10 left-1/4 size-72 bg-pink-600 blur-[300px]"></div>
        
    <div className='flex justify-center items-center flex-col border rounded-2xl p-15 border-pink-500 border-2 gap-2'>
       <h1 className='text-2xl font-bold text-zinc-100'>Login</h1>

       <label htmlFor="email" className='text-lg font-extrabold text-zinc-100'>Emial</label>
       <input type="text" placeholder='enter your email...' className='input-primary' />

       <label htmlFor="email" className='text-lg font-extrabold text-zinc-100 '>Password</label>
       <input type="password" className='input-primary' placeholder='enter password here' />

       <button className='font-bold text-black text-2xl w-full rounded-2xl bg-pink-500 hover:bg-pink-400'>Login</button>
    </div>

    </div>
  )
}

export default page