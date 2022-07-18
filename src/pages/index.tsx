import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { trpc } from '../utils/trpc';
import { prisma } from '../db/prisma';

export default function Home<NextPage>() {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(['user.getAllUsers']);
  if (isLoading || !data) return '';
  
  console.log(data);
  return (
    <div className='pt-48 px-[400px]'>
      <h1 className='test-3xl'>hello</h1>
      <code>{data[0]?.firstName}</code>
    </div>
  );
}
