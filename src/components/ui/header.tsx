'use client';
import Link from 'next/link';
import LogoutButton from './logout';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  loggedIn: boolean;
}

export default  function Header({loggedIn}:HeaderProps) {
  const { data: session  } = useSession();
  const router = useRouter();
  const user =  session?.user
  const [openMobile, setOpenMobile] = useState<Boolean>(false);
  const onClick = () => {
    setOpenMobile(!openMobile);
    console.log("clicked");
  }

  useEffect(() => {
    if (openMobile) {
      setOpenMobile(false);
    }
  }, [router ])
 
  return (
    <>
    <div className="fixed px-5 md:px-8  top-0 left-0 w-full z-30  flex items-center justify-center bg-white shadow-sm">
      <div className="w-full flex items-center py-1 justify-between max-w-[1600px]">


      <Link href="/" className="min-w-36">
        <span className="text-lg font-semibold">SuperMemo</span>{' '}
      </Link>
 

      <nav className="items-center justify-center space-x-8 py-4 hidden md:flex ">
        <Link href="/" className="text-sm">
          Home
        </Link>
        <Link href="/questions" className="text-sm">
          Questions
        </Link>
        <Link href="/exams" className="text-sm">
          Exams
        </Link>
        <Link href="/help" className="text-sm">
          Help
        </Link>
      </nav>

      <div className='hidden md:flex'>
        {loggedIn ? (
          <div id="user" className="group relative flex flex-col items-end min-w-36 ">
            <div className="flex flex-col items-center">

            <div className="w-8 h-8 rounded-full border border-slate-300 bg-black "></div>
            <p className="text-gray-800 text-[10px]">{session?.user?.name}</p>
            </div>
            <div className="absolute hidden group-focus:flex group-hover:flex group-active:absolute top-[100%] right-0 flex-col bg-white border px-3 py-2 border-gray-200 shadow-sm">
              <div className="px-3 py-2 border-b ">
                <Link href={`/account/${user?.id}`} className='text-sm hover:text-purple-600'>Profile</Link>
              </div>
              <div className="px-3 py-2">
                <LogoutButton />
              </div>
            </div>
          </div>
        ) : (
          <div id="user">
            <div className="text-sm flex gap-3">
              <Link
                href="/account/login"
                className="hover:bg-purple-200 hover:text-purple-600 border border-gray-400 px-2 rounded"
              >
                Login
              </Link>
              <Link
                href="/account/register"
                className="hover:bg-purple-200 hover:text-purple-600 border border-gray-400 px-2 rounded"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
      <div id="mobile-nav" className="flex flex-col md:hidden">
        <div className="group relative flex flex-col items-end min-w-36 ">
            <button className="flex flex-col items-center" onClick={onClick}>
              <span className="material-symbols-outlined">more_vert</span>
            </button>
         
             
           
            {/* <div className="absolute hidden group-focus:flex group-hover:flex group-active:absolute top-[100%] right-0 flex-col bg-white border px-3 py-2 border-gray-200 shadow-sm">
              <div className="px-3 py-2 border-b ">
                <Link href={`/account/${user?.id}`} className='text-sm hover:text-purple-600'>Profile</Link>
              </div>
              <div className="px-3 py-2">
                <LogoutButton />
              </div>
            </div> */}
          </div>
      </div>
      </div>
    </div>
    <div className={`fixed right-0 top-0 h-screen w-full border-t-0 bg-gray-50   px-5 py-12 border-l flex-col  z-10 ${openMobile? "":"-translate-x-full hidden"}`}>
      <Link href="/" className="text-sm block py-3">
          Home
        </Link>
        <Link href="/questions" className="text-sm block py-3">
          Questions
        </Link>
        <Link href="/exams" className="text-sm block py-3">
          Exams
        </Link>
        <Link href="/help" className="text-sm block py-3">
          Help
        </Link>
        <hr />
        <div className='py-3'>
        {loggedIn ? (
          <div id="user" className="group relative  ">
         

            {/* <div className="w-8 h-8 rounded-full border border-slate-300 bg-black "></div> */}
            {/* <p className="text-blue-700 text-sm py-3">{session?.user?.name}'s account</p> */}
          
            <div className=" ">
              <div className="  py-2  ">
                <Link href={`/account/${user?.id}`} className='text-sm hover:text-purple-600'>Profile</Link>
              </div>
              <div className=" py-2">
                <LogoutButton />
              </div>
            </div>
          </div>
        ) : (
          <div id="user">
            <div className="text-sm py-3 flex gap-3">
              <Link
                href="/account/login"
                className="hover:bg-purple-200 hover:text-purple-600 border border-gray-400 px-2 rounded"
              >
                Login
              </Link>
              <Link
                href="/account/register"
                className="hover:bg-purple-200 hover:text-purple-600 border border-gray-400 px-2 rounded"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
        </div>
    </div>
    </>

  );
}
