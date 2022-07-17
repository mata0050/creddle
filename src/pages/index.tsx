import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { trpc } from '../utils/trpc';
import { prisma } from '../db/prisma';

export default function Home<NextPage>(props: any) {
  const utils = trpc.useContext();
  const usersQuery = trpc.useQuery(['user.getAllUsers']);
  console.log(usersQuery);

  return (
    <div className='pt-48 px-[400px]'>
      <h1>hello</h1>
      <code>{JSON.stringify(props.users)}</code>
    </div>
  );
}

export const getServerSideProps = async () => {
  let users = await prisma.user.findMany();

  users.map(x => {
    let created = x.createdAt as any 
    created = Math.floor(created / 1000);

    let update = x.updatedAt as any
    update = Math.floor(update / 1000);
    return x;
})
  return {
    props: {
      users,
    },
  };
};
