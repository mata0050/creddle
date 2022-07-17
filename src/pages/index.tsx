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
  const users = await prisma.user.findMany();

  const newUser: any[] = [];

  users.map((x) => {
    if (x.createdAt || x.updatedAt) {
      newUser.push({
        ...x,
        createdAt: 'Jan',
        updatedAt: 'Jan',
      });
    } else {
      newUser.push(x);
    }
  });

  return {
    props: {
      users: newUser,
    },
  };
};
