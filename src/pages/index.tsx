import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const utils = trpc.useContext();
  const usersQuery = trpc.useQuery(['user.getAllUsers']);
  console.log(usersQuery.data);

  return (
    <div>
      <h1 className='text-3xl font-bold underline box-shadow'>Hello world!</h1>
    </div>
  );
};

export default Home;
