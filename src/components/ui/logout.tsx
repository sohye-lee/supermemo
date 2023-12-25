'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <span
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </span>
  );
}
