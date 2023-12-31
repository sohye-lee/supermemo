'use client';
import Link from 'next/link';
import LogoutButton from './logout';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconDots, IconPlus, IconDotsVertical } from '@tabler/icons-react';
import { Session } from 'next-auth';
import Logo from 'public/image/logo_hor.svg';
import Image from 'next/image';

interface HeaderProps {
  loggedIn: boolean;
  session?: Session | null;
}

export default function Header({ loggedIn, session }: HeaderProps) {
  // const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;
  const [openMobile, setOpenMobile] = useState<Boolean>(false);
  const [openDrop, setOpenDrop] = useState<Boolean>(false);

  const onClick = () => {
    setOpenMobile(!openMobile);
  };

  const onDropClick = () => {
    setOpenDrop(!openDrop);
  };

  useEffect(() => {
    if (openMobile) {
      setOpenMobile(false);
      setOpenDrop(false);
    }
  }, [router]);

  return (
    <>
      <div className="fixed px-5 md:px-8  top-0 left-0 w-full z-50 min-h-[40px] flex items-center justify-center bg-white shadow-sm">
        <div className="w-full flex items-center py-1 justify-between max-w-[1600px]">
          <Link href="/" className="min-w-36 w-36">
            <Image src={Logo} alt="" className="w-full" />
          </Link>

          <nav className="items-center justify-center space-x-8 py-4 hidden md:flex ">
            <Link href="/" className="text-sm">
              Home
            </Link>
            <Link href="/memos" className="text-sm">
              SuperMemos
            </Link>
            <Link href="/help" className="text-sm">
              Help
            </Link>
          </nav>

          <div className="hidden md:flex gap-8 min-w-36 justify-end items-center">
            <Link
              href="/memos/new"
              className="h-10 w-10 z-50 bg-purple-400 rounded-full border border-slate-800 flex items-center justify-center shadow-md shadow-slate-400 hover:shadow-none transition hover:bg-purple-300"
            >
              <IconPlus size={18} />
            </Link>
            {loggedIn ? (
              <div
                id="user"
                className="group relative flex flex-col items-end"
                onClick={onDropClick}
              >
                <input
                  type="checkbox"
                  className="hidden absolute top-1/2 right-1/2 w-full h-full"
                />
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border border-slate-300 bg-black "></div>
                  <p className="text-gray-800 text-[10px]">{user?.name}</p>
                </div>
                <div
                  className={`absolute   top-[115%] right-0 flex-col bg-white border px-3 py-2 border-gray-200 shadow-sm w-52 ${
                    openDrop ? 'flex' : 'hidden'
                  } `}
                >
                  <div className="px-3 py-2 border-b ">
                    <Link
                      href={`/account/me`}
                      className="text-sm hover:text-purple-600"
                    >
                      Profile
                    </Link>
                  </div>
                  <div className="px-3 py-2 border-b ">
                    <Link
                      href={`/account/questions`}
                      className="text-sm hover:text-purple-600"
                    >
                      My Questions
                    </Link>
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
          <div
            id="mobile-nav"
            className="flex items-center justify-end gap-4 md:hidden"
          >
            <Link
              href="/memos/new"
              className="h-10 w-10  z-50 bg-purple-600 rounded-full flex items-center justify-center shadow-md shadow-slate-400 hover:shadow-none transition hover:bg-purple-700"
            >
              <IconPlus size={18} color="white" />
            </Link>
            <div className=" relative flex flex-col items-end  ">
              <button
                type="button"
                className="flex flex-col items-center"
                onClick={onClick}
              >
                <IconDotsVertical />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed right-0 top-0 h-screen w-full border-t-0 bg-gray-50 px-5 py-12 border-l flex-col z-40 ${
          openMobile ? '' : '-translate-x-full hidden'
        }`}
      >
        <Link href="/" className="text-sm block py-3">
          Home
        </Link>

        <Link href="/memos" className="text-sm block py-3">
          SuperMemos
        </Link>
        <Link href="/help" className="text-sm block py-3">
          Help
        </Link>
        <hr />
        <div className="py-3">
          {loggedIn ? (
            <div id="user" className="group relative  ">
              <div className=" ">
                <div className="  py-2  ">
                  <Link
                    href={`/account/me`}
                    className="text-sm hover:text-purple-600"
                  >
                    Profile
                  </Link>
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
