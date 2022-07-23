import React, { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import { useForm } from 'react-hook-form';
import superjson from 'superjson';
import moment from 'moment';
import toast from 'react-hot-toast';
import { DatePicker } from '@mantine/dates';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';

export default function Education() {
  const [editEducation, setEditEducation] = useState({});

  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery([
    'education.getById',
    { id: '4e06def1-53e4-436a-894d-7260814df125' },
  ]);
  const [createEditEducation, setCreateEditEducation] = useState(false);
  const onCreateEditEducation = () =>
    setCreateEditEducation((prevSate) => !prevSate);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className='mt-6'>
      <EducationHeading onCreateEditEducation={onCreateEditEducation} />

      {createEditEducation && (
        <CreateEditEducation
          onCreateEditEducation={onCreateEditEducation}
          editEducation={editEducation}
          setEditEducation={setEditEducation}
        />
      )}

      {!createEditEducation && (
        <>
          {data.map((data, index) => (
            <div key={index}>
              <ViewEducation
                education={data}
                editEducation={editEducation}
                setEditEducation={setEditEducation}
                onCreateEditEducation={onCreateEditEducation}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function EducationHeading({ onCreateEditEducation }: any) {
  return (
    <div>
      <div className='flex justify-between border-b-2 border-b-black mb-4'>
        <h1 className='text-3xl'>Education</h1>
      </div>

      <button
        className='p-2 bg-gray-400 text-white rounded hover:opacity-70 text-sm mb-4'
        onClick={onCreateEditEducation}
      >
        Add New Education
      </button>
    </div>
  );
}

function ViewEducation({
  education,
  editEducation,
  setEditEducation,
  onCreateEditEducation,
}: any) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const client = trpc.useContext();
  const { mutate: deleteEducation, isLoading } = trpc.useMutation(
    ['education.delete'],
    {
      onSuccess: () => {
        toast.success('Delete Successful');
        client.invalidateQueries([
          'education.getById',
          { id: '4e06def1-53e4-436a-894d-7260814df125' },
        ]);
      },
    }
  );

  const onDeleteEducation = () => {
    try {
      deleteEducation({
        id: education.id,
      });
    } catch (error) {
      toast.error('Please try again');
    }
  };

  return (
    <>
      {!showDeleteButton && (
        <div
          className='mb-4 hover:border hover:border-black hover:rounded	p-4 cursor-pointer'
          onClick={() => setShowDeleteButton(true)}
        >
          <>
            <p className='opacity-70 text-2xl'>{education?.school}</p>
            <div className='flex mb-2 text-sm'>
              <p className='opacity-70'>
                {moment(education?.startDate).format('MMMM YYYY')}
              </p>
              <span className='mx-2'>to</span>
              <p className='opacity-70'>
                {moment(education?.endDate).format('MMMM YYYY')}
              </p>
            </div>
            <p className='opacity-70'>{education?.degree}</p>
            <p className='opacity-70'>{education?.field}</p>
          </>
        </div>
      )}

      {showDeleteButton && (
        <div className='border border-black rounded h-36 flex justify-center items-center gap-4 relative'>
          <AiFillCloseCircle
            className='text-3xl hover:opacity-50 cursor-pointer text-red-600 absolute right-6 top-6'
            onClick={() => setShowDeleteButton(false)}
          />

          <div
            className='flex gap-2 p-2 bg-gray-400 text-white w-[120px] rounded hover:opacity-60 cursor-pointer'
            onClick={() => {
              setEditEducation(education);
              setShowDeleteButton(false);
              onCreateEditEducation();
            }}
          >
            <p className='text-sm'> Click to Edit</p>
            <GrEdit className='text-lg  text-white' />
          </div>

          <div
            className='flex gap-2 p-2 bg-gray-300 text-red-600 w-[135px] rounded hover:opacity-60 cursor-pointer'
            onClick={() => {
              onDeleteEducation();
              setShowDeleteButton(false);
            }}
          >
            <p className='text-sm'>Click to Delete</p>
            <AiOutlineDelete className='text-lg text-red-600  ' />
          </div>
        </div>
      )}
    </>
  );
}

function CreateEditEducation({
  onCreateEditEducation,
  editEducation,
  setEditEducation,
}: any) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (editEducation.startDate) {
      setStartDate(new Date(editEducation.startDate));
    }
    if (editEducation.endDate) {
      setEndDate(new Date(editEducation.endDate));
    }
  }, [editEducation]);

  const client = trpc.useContext();
  const { mutate: addEducation, isLoading } = trpc.useMutation(
    ['education.add'],
    {
      onSuccess: () => {
        toast.success('Adding Education Successful');
        client.invalidateQueries([
          'education.getById',
          { id: '4e06def1-53e4-436a-894d-7260814df125' },
        ]);
      },
    }
  );

  const { mutate: editUser } = trpc.useMutation(['education.edit'], {
    onSuccess: () => {
      toast.success('Edit Education Successful');
      client.invalidateQueries([
        'education.getById',
        { id: '4e06def1-53e4-436a-894d-7260814df125' },
      ]);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (Object.keys(editEducation).length > 0) {
        editUser({
          ...data,
          id: editEducation.id,
          startDate,
          endDate,
          userId: '4e06def1-53e4-436a-894d-7260814df125',
        });
        return onCreateEditEducation();
      }

      addEducation({
        ...data,
        startDate,
        endDate,
        userId: '4e06def1-53e4-436a-894d-7260814df125',
      });
      onCreateEditEducation();
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
    <div className='mt-6 '>
      <form
        className='grid grid-cols-1 gap-y-4  p-8 rounded-lg box-shadow'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex justify-between border-b-2 border-b-black mb-4 pb-2'>
          {Object.keys(editEducation).length === 0 ? (
            <h1 className='text-xl'>Add New Education</h1>
          ) : (
            <h1 className='text-xl'>Edit Education</h1>
          )}

          <AiFillCloseCircle
            className='text-2xl hover:opacity-50 cursor-pointer text-red-600'
            onClick={() => {
              onCreateEditEducation();
              setEditEducation({});
            }}
          />
        </div>

        <label className='block'>
          <span className='text-gray-700'>School</span>
          <input
            type='text'
            className='mt-1 block w-full h-8 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            {...register('school', {
              required: true,
              value: editEducation?.school,
            })}
          />
        </label>

        <label className='block'>
          <span className='text-gray-700'>Degree</span>
          <input
            type='text'
            className='mt-1 block w-full h-8 px-2  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            {...register('degree', { value: editEducation?.degree })}
          />
        </label>

        <label className='block'>
          <span className='text-gray-700'>Field</span>
          <input
            type='text'
            className='mt-1 block w-full h-8 px-2  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            {...register('field', { value: editEducation?.field })}
          />
        </label>

        <DatePicker
          placeholder='Pick date'
          label='Start date'
          value={startDate}
          onChange={(date) => setStartDate(date)}
          required
        />

        <DatePicker
          placeholder='Pick date'
          label='End date'
          value={endDate}
          onChange={(date) => setEndDate(date)}
          required
        />

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
