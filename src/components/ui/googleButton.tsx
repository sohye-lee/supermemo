import { FC, ReactNode } from 'react';
import Button from './button';

interface GoogleButtonProps {
  children: ReactNode;
}

export default function GoogleButton({ children }: GoogleButtonProps) {
  const loginWithGoogle = () => console.log('login with google');
  return (
    <Button mode="black" size="medium" button={true} onClick={loginWithGoogle}>
      {children}
    </Button>
  );
}
