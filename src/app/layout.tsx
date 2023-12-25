import type { Metadata } from 'next';
import { Inter, Epilogue, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'] });
const epilog = Epilogue({ subsets: ['latin'] });
const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SuperMemo',
  description: 'Best app for your exam preparation',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${roboto_mono.className} ${inter.className}`}>
        <Header loggedIn={session ? true : false} />
        <div className="min-h-screen bg-white py-14">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
