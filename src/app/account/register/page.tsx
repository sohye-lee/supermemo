import Container from '@/components/ui/container';
import Hero from '@/components/ui/hero';
import GradientImage from 'public/image/bg-gradient-2.jpg';
import RegisterForm from '../../../components/forms/registerForm';

export default async function RegisterPage() {
  return (
    <>
      {/* <Hero alt="" img={GradientImage} title="Create Your Account" /> */}
      <Container full={false} narrow={true}>
        <RegisterForm />
      </Container>
    </>
  );
}
