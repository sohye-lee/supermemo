import Link from 'next/link';
import LogoutButton from './logout';

interface HeaderProps {
  loggedIn: boolean;
}

export default function Header({ loggedIn }: HeaderProps) {
  return (
    <div className="fixed px-5 top-0 left-0 w-full z-10 scroll-m-4 flex items-center justify-between">
      <Link href="/">
        <span className="text-lg font-semibold">SuperMemo</span>{' '}
      </Link>
      <nav className="flex items-center justify-center space-x-12 py-4  ">
        <Link href="/" className="text-sm">
          Home
        </Link>
        <Link href="/questions" className="text-sm">
          Questions
        </Link>
        <Link href="/exams" className="text-sm">
          Exams
        </Link>
      </nav>
      <div>
        {loggedIn ? (
          <div id="user" className="group relative">
            <div className="w-8 h-8 rounded-full border border-slate-300 bg-black "></div>
            <div className="hidden group-hover:absolute group-active:absolute bottom-0 right-0 bg-white border border-gray-100">
              <LogoutButton />
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
    </div>
  );
}
