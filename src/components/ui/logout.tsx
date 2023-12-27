'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <span
      onClick={() => {
        signOut();
      }}
      className='text-sm hover:text-purple-600'
    >
      Logout
    </span>
  );
}
