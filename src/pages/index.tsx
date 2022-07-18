import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { trpc } from '../utils/trpc';
import { prisma } from '../db/prisma';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Home<NextPage>() {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(['user.getAllUsers']);
  if (isLoading || !data) return <div>Loading...</div>;

  console.log(data);
  return (
    <div className='pt-48 px-[400px]'>
      <h1 className='test-3xl'>hello</h1>
      <code>{data[0]?.firstName}</code>

      <CreateUser />
    </div>
  );
}

function CreateUser() {
  const { mutate: newUser, isLoading } = trpc.useMutation(['user.add'], {
    onSuccess: () => {
      toast.success('Registration Successful');
    },
  });

  const onSubmit = async (data: any) => {
    if (data.email.split('@')[1] !== 'gmail.com') {
      toast.error(
        'Please make sure Student Email Address is a Gmail email address'
      );
    }

    try {
      newUser(data);
    } catch (error) {
      toast.error('Please Filling out the application again');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div className='mt-6'>
      <form
        className='grid grid-cols-1 gap-y-6  p-8 rounded-lg box-shadow'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-xl'>Create New User</h1>

        <label className='block'>
          <span className='text-gray-700'>First Name</span>
          <input
            type='text'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            {...register('firstName', { required: true })}
          />
        </label>

        <label className='block'>
          <span className='text-gray-700'>Last Name</span>
          <input
            type='text'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            {...register('lastName', { required: true })}
          />
        </label>

        <label className='block'>
          <span className='text-gray-700'>Phone Number</span>
          <input
            type='text'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            {...register('phone', { required: true })}
          />
        </label>

        <label className='block'>
          <span className='text-gray-700'>Email</span>
          <input
            type='email'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            {...register('email', { required: true })}
          />
        </label>

        <label className='block'>
          <span className='text-gray-700'>Github Username</span>
          <input
            type='text'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            {...register('github', { required: true })}
          />
        </label>

        <label className='block'>
          <span className='text-gray-700'>Location</span>
          <input
            type='text'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            {...register('location', { required: true })}
          />
        </label>

        <label className='block'>
          <span className='text-gray-700'>Summary</span>
          <input
            type='text'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            {...register('summary', { required: true })}
          />
        </label>

        <button
          disabled={isLoading}
          type='submit'
          className='my-4 capitalize bg-darkGrey text-white font-medium py-2 px-4 rounded-md hover:opacity-70'
        >
          {isLoading ? (
            <span className='flex items-center justify-center'>
              <svg
                className='w-6 h-6 animate-spin mr-1'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z' />
              </svg>
              Submitting...
            </span>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </div>
  );
}
