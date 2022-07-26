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
import Input from './Layout/Input';
import Form from './Layout/Form';
import FormButton from './Layout/FormButton';

export default function Skill() {
  const [editEducation, setEditEducation] = useState({});

  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery([
    'skill.getById',
    { id: '4e06def1-53e4-436a-894d-7260814df125' },
  ]);
  const [addSkill, setAddSkill] = useState(false);
  const onShowSkill = () => setAddSkill((prevState) => !prevState);
  const [createEditEducation, setCreateEditEducation] = useState(false);
  const onCreateEditEducation = () =>
    setCreateEditEducation((prevSate) => !prevSate);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="mt-6">
      <SkillHeading />
      {addSkill && <AddSkill onShowSkill={onShowSkill} />}
      <ViewSkills skills={data} onShowSkill={onShowSkill} />
    </div>
  );
}

function SkillHeading() {
  return (
    <div>
      <div className="flex justify-between border-b-2 border-b-black mb-4">
        <h1 className="text-3xl">Skills</h1>
      </div>
    </div>
  );
}

function ViewSkills({ skills, onShowSkill }: any) {
  return (
    <>
      <button
        className="p-2 bg-gray-500 text-sm text-white rounded hover:opacity-60 mb-4"
        onClick={onShowSkill}>
        Add Skill
      </button>
      <h1 className="text-xl uppercase mb-2">Frameworks</h1>

      <div className="flex gap-3">
        {skills.frameworks !== 0 &&
          skills.frameworks.map((skill: any) => (
            <p
              key={skill.id}
              className="opacity-70 border border-black px-3 rounded inline-block">
              {skill.name}
            </p>
          ))}
      </div>

      <h1 className="text-xl uppercase mt-6 mb-2">Systems</h1>

      <div className="flex gap-3">
        {skills.system !== 0 &&
          skills.system.map((skill: any) => (
            <p
              key={skill.id}
              className="opacity-70 border border-black px-3 rounded inline-block">
              {skill.name}
            </p>
          ))}
      </div>

      <h1 className="text-xl uppercase mt-6 mb-2">Languages</h1>

      <div className="flex gap-3">
        {skills.languages !== 0 &&
          skills.languages.map((skill: any) => (
            <p
              key={skill.id}
              className="opacity-70 border border-black px-3 rounded inline-block">
              {skill.name}
            </p>
          ))}
      </div>
    </>
  );
}

function AddSkill({ onShowSkill }: any) {
  const client = trpc.useContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: addSkill, isLoading } = trpc.useMutation(['skill.add'], {
    onSuccess: () => {
      toast.success('Add Skill Successful');
      client.invalidateQueries([
        'skill.getById',
        { id: '4e06def1-53e4-436a-894d-7260814df125' },
      ]);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      addSkill({
        ...data,
        userId: '4e06def1-53e4-436a-894d-7260814df125',
      });
      onShowSkill();
    } catch (error) {
      toast.error('Please try again');
    }
  };


  return (
    <Form handleSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between border-b-2 border-b-black mb-4 pb-2">
        {/* {Object.keys(editEducation).length === 0 ? (
          <h1 className='text-xl'>Add New Education</h1>
        ) : (
        )} */}
        <h1 className="text-xl">Add Skill</h1>

        <AiFillCloseCircle
          className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
          onClick={() => {
            onShowSkill();
          }}
        />
      </div>

      <Input
        label={'Name'}
        register={register('name', {
          required: true,
          value: '',
        })}
      />

      <label className="block">
        <span className="text-gray-700">Skill Section</span>
        <select
          {...register('skill', { value: '' })}
          className="mt-1 block w-full h-8 px-2  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="FRAMEWORKS">Framework</option>
          <option value="SYSTEMS">Systems</option>
          <option value="LANGUAGES">Languages</option>
        </select>
      </label>

      <FormButton isLoading={isLoading} />
    </Form>
  );
}
