import type { Metadata } from 'next';
import { Inter, Epilogue, Roboto_Mono, Lexend_Deca, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { Session, getServerSession } from 'next-auth';
import Provider from './provider';
// import { useSession } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { SWRProvider } from './swr-provider';

const inter = Inter({ subsets: ['latin'] });
const epilog = Epilogue({ subsets: ['latin'] });
const roboto_mono = Roboto_Mono({ subsets: ['latin'] });
const space_grotesk = Space_Grotesk({ subsets: ['latin'] });

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
  console.log(session);
  return (
    <html lang="en">
      <body className={`${roboto_mono.className} ${space_grotesk.className}`}>
        <Provider>
            <Header loggedIn={session ? true : false} session={session} />
            <SWRProvider>
              <div className="min-h-screen bg-white pb-14">{children}</div>
            </SWRProvider>
            <Footer />
        </Provider>
      </body>
    </html>
  );
}
