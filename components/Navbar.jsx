"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'

import Image from "next/image"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Navbar = () => {
  const { data: session } = useSession();

  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)



  useEffect(() => {

    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();

  }, [])




  

  return (
    <div className='flex justify-between m-4'>

      <div>
        <Link href="/"><div className="bg-black rounded-xl text-white text-xl p-3">Devs Nest</div></Link>
      </div>




      <div className="sm:flex hidden ">
        {session?.user ? (
          <div className='flex gap-3 md:gap-5 justify-center items-center'>
            <Link href="/create-post">
             <div  className='bg-black text-white rounded-full py-1.5 px-5 hover:bg-white hover:text-black border-2 '>Create Post</div> 
            </Link>
            <button type="button" onClick={signOut} >
            <div className="bg-black text-white rounded-full py-1.5 px-5 hover:bg-white hover:text-black border-2 ">  sign out</div>
          
            
            </button>

            <Link href='/'>
              <Image
                src={session?.user.image}
                width={37}
                height={37} className='rounded-full' alt="profile"
                onClick={() => {

                }}
              >
              </Image>
            </Link>

          </div>

        ) : (

          <div>
            {
              providers &&

              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={
                    () => signIn(provider.id)
                  }

                  className='bg-black text-white rounded-full  py-1.5 px-5 hover:bg-white hover:text-black border-2'
                >
                  sign In
                </button>
              ))}
          </div>
        )}
      </div>



      <div className="sm:hidden">
        {session?.user ? (

          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt="profile"
              onClick={
                () => setToggleDropdown((prev) =>
                  !prev
                )
              }
            >
            </Image>

            {toggleDropdown && (
              <div className='absolute right-0 mr-2 mt-[4rem] dropdown bg-white text-right flex flex-col rounded-xl p-4 gap-3'>
              
                <Link
                  href="/create-post"
                  className=''
                  onClick={
                    () => setToggleDropdown(false)
                  }
                >
                  create Post
                </Link>
                <button
                  type="button"
                  onClick={
                    () => {
                      setToggleDropdown(false)
                      signOut()
                    }
                  }

                  className='bg-black text-white rounded-full  py-1.5 px-5 hover:bg-white hover:text-black border-2'
                >Sign Out</button>
              </div>
            )}

          </div>
        ) : (

          <div className="">
            {
              providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={
                    () => signIn(provider.id)
                  }

                  className='w-full bg-black text-white rounded-full  py-1.5 px-5 hover:bg-white hover:text-black border-2'

                >
                  sign In
                </button>
              ))}
          </div>

        )}
      </div>


    </div>
  )
}

export default Navbar