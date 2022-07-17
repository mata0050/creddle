import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { trpc } from '../utils/trpc';
import { prisma } from '../db/prisma';

const Home: NextPage = (props : any) => {
  const utils = trpc.useContext();
  const usersQuery = trpc.useQuery(['user.getAllUsers']);
  console.log(props.users);

  return (
    <div className='pt-48 px-[400px]'>
      <h1>hello</h1>
      <code>{props.users}</code>
    </div>
  );
};

export const getServerSideProps = async () => {
  const users = await prisma.user.findMany();
  return {
    props: {
      users : JSON.stringify(users),
    },
  };
};

export default Home;
