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



export default function Skill() {
  const [editEducation, setEditEducation] = useState({});

  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery([
    'skill.getById',
    { id: '4e06def1-53e4-436a-894d-7260814df125' },
  ]);
  const [addSkill, setAddSkill] = useState(false);
  const onShowSkill =()=> setAddSkill(prevState => !prevState)
  const [createEditEducation, setCreateEditEducation] = useState(false);
  const onCreateEditEducation = () =>
    setCreateEditEducation((prevSate) => !prevSate);


  if (isLoading || !data) return <div>Loading...</div>;


  return (
    <div className='mt-6'>
      <SkillHeading />
      {addSkill && <AddSkill onShowSkill={onShowSkill}/>}
      <ViewSkills skills={data} onShowSkill={onShowSkill}/>
    </div>
  );
}

function SkillHeading() {
  return (
    <div>
      <div className='flex justify-between border-b-2 border-b-black mb-4'>
        <h1 className='text-3xl'>Skills</h1>
      </div>
    </div>
  );
}

function ViewSkills({ skills, onShowSkill }: any) {
 

  return (
    <>
 
    <button className='p-2 bg-gray-500 text-sm text-white rounded hover:opacity-60 mb-4' onClick={onShowSkill}>Add Skill</button>
      <h1 className='text-xl uppercase mb-2'>Frameworks</h1>

      <div className='flex gap-3'>
        {skills.frameworks !== 0 &&
          skills.frameworks.map((skill: any) => (
            <p
              key={skill.id}
              className='opacity-70 border border-black px-3 rounded inline-block'
            >
              {skill.name}
            </p>
          ))}
      </div>

      <h1 className='text-xl uppercase mt-6 mb-2'>Systems</h1>

      <div className='flex gap-3'>
        {skills.system !== 0 &&
          skills.system.map((skill: any) => (
            <p
              key={skill.id}
              className='opacity-70 border border-black px-3 rounded inline-block'
            >
              {skill.name}
            </p>
          ))}
      </div>

      <h1 className='text-xl uppercase mt-6 mb-2'>Languages</h1>

      <div className='flex gap-3'>
        {skills.languages !== 0 &&
          skills.languages.map((skill: any) => (
            <p
              key={skill.id}
              className='opacity-70 border border-black px-3 rounded inline-block'
            >
              {skill.name}
            </p>
          ))}
      </div>
    </>
  );
}


function AddSkill({onShowSkill}: any){
  const client = trpc.useContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: addSkill, isLoading } = trpc.useMutation(
    ['skill.add'],
    {
      onSuccess: () => {
        toast.success('Add Skill Successful');
        client.invalidateQueries([
          'skill.getById',
          { id: '4e06def1-53e4-436a-894d-7260814df125' },
        ]);
      },
    }
  );

  const onSubmit = async (data: any) => {
    try {
      addSkill({
        ...data,
        userId: '4e06def1-53e4-436a-894d-7260814df125'
      });
      onShowSkill()
   
    } catch (error) {
      toast.error('Please try again');
    }
  };


  return (
    <div className='my-6'>
    <form
      className='grid grid-cols-1 gap-y-4  p-8 rounded-lg box-shadow'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex justify-between border-b-2 border-b-black mb-4 pb-2'>
        {/* {Object.keys(editEducation).length === 0 ? (
          <h1 className='text-xl'>Add New Education</h1>
        ) : (
        )} */}
        <h1 className='text-xl'>Add Skill</h1>

        <AiFillCloseCircle
          className='text-2xl hover:opacity-50 cursor-pointer text-red-600'
          onClick={() => {
            onShowSkill()
          }}
        />
      </div>

      <label className='block'>
        <span className='text-gray-700'>Name</span>
        <input
          type='text'
          className='mt-1 block w-full h-8 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          {...register('name', {
            required: true,
            value: '',
          })}
        />
      </label>

      <label className='block'>
        <span className='text-gray-700'>Skill Section</span>
         <select  {...register('skill', { value: '' })}  
          className='mt-1 block w-full h-8 px-2  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
            <option value="FRAMEWORKS">Framework</option>
            <option value="SYSTEMS">Systems</option>
            <option value="LANGUAGES">Languages</option>
        </select>
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


  )
}