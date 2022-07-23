import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import { GrEdit } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import superjson from 'superjson';
import moment from 'moment';

export default function Education() {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(['education.getAll']);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const onShowCreateUser = () => setShowCreateUser((prevSate) => !prevSate);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className='mt-6'>
      <EducationHeading onShowCreateUser={onShowCreateUser} />
      <ViewEducation education={data[0]} />
    </div>
  );
}

// school: true,
// degree: true,
// field: true,
// startDate: true,
// endDate: true,

function EducationHeading({ onShowCreateUser }: any) {
  return (
    <div>
      <div className='flex justify-between border-b-2 border-b-black mb-4'>
        <h1 className='text-3xl'>Education</h1>

        <GrEdit
          className='text-xl hover:opacity-50 cursor-pointer'
          onClick={onShowCreateUser}
        />
      </div>

      <button className='p-2 bg-gray-400 text-white rounded hover:opacity-70 text-sm mb-4'>Add New Education</button>
    </div>
  );
}

function ViewEducation({ education, onShowCreateUser }: any) {
  return (
    <div>
      <p className='opacity-70 text-2xl mb-1'>{education?.school}</p>
      <div className='flex mb-2'>
        <p className='opacity-70'>
          {moment(education?.startDate).format('MMMM YYYY')}
        </p>
        <span className='mx-3'>to</span>
        <p className='opacity-70'>
          {moment(education?.endDate).format('MMMM YYYY')}
        </p>
      </div>
      <p className='opacity-70'>{education?.degree}</p>
      <p className='opacity-70'>{education?.field}</p>
    </div>
  );
}
