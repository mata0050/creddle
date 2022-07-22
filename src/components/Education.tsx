import React, {useState} from 'react'
import { trpc } from '../utils/trpc';
import { GrEdit } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function Education() {
    const utils = trpc.useContext();
    const { data, isLoading } = trpc.useQuery(['education.getAll']);
    const [showCreateUser, setShowCreateUser] = useState(false);
    const onShowCreateUser = () => setShowCreateUser((prevSate) => !prevSate);
  
    if (isLoading || !data) return <div>Loading...</div>;
  
  return (
    <div>
        {data.map((data, index) => 
        <div key={index}>
            <ViewEducation education={data}/>
        </div>)}
    </div>
  )
}

// school: true,
// degree: true,
// field: true,
// startDate: true,
// endDate: true,



function ViewEducation({ education, onShowCreateUser }: any) {
    return (
      <div className='mt-6'>
        <div className='flex justify-between border-b-2 border-b-black mb-4'>
          <h1 className='text-3xl'>Education</h1>
  
          <GrEdit
            className='text-xl hover:opacity-50 cursor-pointer'
            onClick={onShowCreateUser}
          />
        </div>
  
        <p className='opacity-70'>{education?.school}</p>
        <p className='opacity-70'>{education?.degree}</p>
        <p className='opacity-70'>{education?.field}</p>
        <p className='opacity-70'>{JSON.stringify(education?.startDate)}</p>
        <p className='opacity-70'>{JSON.stringify(education?.endDate)}</p>
  
</div>
    );
  }