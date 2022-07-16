import Head from 'next/head';
import { ReactNode } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import Navbar from './Navbar';
import SideNav from './SideNav';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className='bg-grey'>
      <Head>
        <title>Prisma Starter</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <SideNav />
      <main>{children}</main>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </div>
  );
};
