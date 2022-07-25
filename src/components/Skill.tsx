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

type Skill = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  name: string;
  skill: string;
};

type Skills = {
  frameworks: Skill[];
  system: Skill[];
  languages: Skill[];
};

export default function Skill() {
  const [editEducation, setEditEducation] = useState({});

  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery([
    'skill.getById',
    { id: '4e06def1-53e4-436a-894d-7260814df125' },
  ]);
  const [createEditEducation, setCreateEditEducation] = useState(false);
  const onCreateEditEducation = () =>
    setCreateEditEducation((prevSate) => !prevSate);

  if (isLoading || !data) return <div>Loading...</div>;

  const skills: Skills = {
    frameworks: [],
    system: [],
    languages: [],
  };

  data.forEach((skill: Skill) => {
    if (skill.skill === 'FRAMEWORKS') {
      skills.frameworks.push(skill);
    } else if (skill.skill === 'SYSTEM') {
      skills.system.push(skill);
    } else {
      skills.languages.push(skill);
    }
  });

  return (
    <div className='mt-6'>
      <SkillHeading onCreateEditEducation={onCreateEditEducation} />

      <ViewSkills skills={skills} />
    </div>
  );
}

function SkillHeading({ onCreateEditEducation }: any) {
  return (
    <div>
      <div className='flex justify-between border-b-2 border-b-black mb-4'>
        <h1 className='text-3xl'>Skills</h1>
      </div>
    </div>
  );
}

function ViewSkills({ skills }: any) {
  return (
    <>
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
