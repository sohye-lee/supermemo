import Container from '@/components/ui/container';
import Hero from '@/components/ui/hero';
import GradientImage from 'public/image/bg-gradient-2.jpg';
import RegisterForm from '../../../components/forms/registerForm';
import FormLayout from '@/components/ui/formLayout';

export default async function RegisterPage() {
  return (
    <>
      <FormLayout title="Sign Up">
        <RegisterForm />
      </FormLayout>
    </>
  );
}
