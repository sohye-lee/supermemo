'use server';
import Container from '@/components/ui/container';
import Hero from '@/components/ui/hero';
import LoginForm from '../../../components/forms/loginForm';
import GradientImage from 'public/image/bg-gradient-2.jpg';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <>
      {/* <Hero alt="" img={GradientImage} title="Welcome Back!" /> */}
      <Container full={false} narrow={true}>
        <LoginForm />
      </Container>
    </>
  );
}
