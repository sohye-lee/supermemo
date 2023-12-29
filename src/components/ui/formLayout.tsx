import { Session, getServerSession } from 'next-auth';
import Container from './container';
import PageTitle from '../forms/pageTitle';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  wide: 'full' | 'wide' | 'narrow';
  [key: string]: any;
}

export default async function FormLayout({ children, title, wide }: FormLayoutProps) {
  return (
    <div className="pt-16">
      <Container wide={wide} narrow={wide}>
        <PageTitle title={title} addClass="mb-4" />
        {children}
      </Container>
    </div>
  );
}
