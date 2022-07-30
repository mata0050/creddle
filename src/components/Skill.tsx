import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiFillCloseCircle } from 'react-icons/ai';
import Input from './Layout/Input';
import Form from './Layout/Form';
import FormButton from './Layout/FormButton';
import EditDeleteButtons from './Layout/EditDeleteButtons';
import { UserProfileType, Skills, Skill as SkillType } from '~/types/UserTypes';
import Heading from './Layout/Heading';
import Button from './Layout/Button';

type SelectedItemTypes = {
  id: string;
  name: string;
  skill: string;
};

export default function Skill({
  currentUser,
}: {
  currentUser: UserProfileType;
}): JSX.Element {
  const [addSkill, setAddSkill] = useState<boolean>(false);
  const onShowAddEditForm = (show: boolean) => setAddSkill(show);

  const [selectedItem, setSelectedItem] = useState<SelectedItemTypes>({
    id: '',
    name: '',
    skill: '',
  });

  const resetSelectedItem = () =>
    setSelectedItem({
      id: '',
      name: '',
      skill: '',
    });

  return (
    <div className='mt-6'>
      <Heading heading='Skills' />
      {addSkill && (
        <AddSkill
          onShowAddEditForm={onShowAddEditForm}
          currentUser={currentUser}
          selectedItem={selectedItem}
          resetSelectedItem={resetSelectedItem}
        />
      )}
      <ViewSkills
        skills={currentUser?.skills}
        onShowAddEditForm={onShowAddEditForm}
        currentUser={currentUser}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
}

type ViewSkillsProps = {
  skills: SkillType[] | undefined;
  onShowAddEditForm: (show: boolean) => void;
  currentUser: UserProfileType;
  selectedItem: SelectedItemTypes;
  setSelectedItem: ({ id, name, skill }: SelectedItemTypes) => void;
};

function ViewSkills({
  skills,
  onShowAddEditForm,
  currentUser,
  selectedItem,
  setSelectedItem,
}: ViewSkillsProps) {
  const [showEditDeleteButton, setShowEditDeleteButton] = useState(false);

  const onShowEditDeleteButton = () =>
    setShowEditDeleteButton((prevState) => !prevState);

  const selectItem = ({ id, name, skill }: any) => {
    setSelectedItem({ id: id, name, skill });
    onShowEditDeleteButton();
  };

  const onEdit = () => {
    // selectItem();
    onShowAddEditForm(true);
    onShowEditDeleteButton();
  };

  const skillsSplit: Skills = {
    frameworks: [],
    system: [],
    languages: [],
  };

  skills !== undefined &&
    skills.forEach((skill: SkillType) => {
      if (skill.skill === 'FRAMEWORKS') {
        skillsSplit.frameworks.push(skill);
      } else if (skill.skill === 'SYSTEMS') {
        skillsSplit.system.push(skill);
      } else if (skill.skill === 'LANGUAGES') {
        skillsSplit.languages.push(skill);
      }
    });

  const Skills = ({ title, skills, section }: any) => (
    <>
      <h1 className='text-xl uppercase my-4'>{title}</h1>

      <div className='flex gap-3 flex-wrap'>
        {skills.frameworks !== 0 &&
          skills[section].map((skill: any) => (
            <p
              key={skill.id}
              onClick={() =>
                selectItem({
                  id: skill.id,
                  name: skill.name,
                  skill: skill.skill,
                })
              }
              className='opacity-70 border border-black px-3 rounded inline-block'
            >
              {skill.name}
            </p>
          ))}
      </div>
    </>
  );

  return (
    <>
      {!showEditDeleteButton && (
        <>
          <Button title='Add Skill' onClick={() => onShowAddEditForm(true)} />

          {skillsSplit.frameworks.length !== 0 && (
            <Skills
              title='Frameworks'
              skills={skillsSplit}
              section='frameworks'
            />
          )}

          {skillsSplit.system.length !== 0 && (
            <Skills title='Systems' skills={skillsSplit} section='system' />
          )}

          {skillsSplit.languages.length !== 0 && (
            <Skills
              title='Languages'
              skills={skillsSplit}
              section='languages'
            />
          )}
        </>
      )}

      {showEditDeleteButton && (
        <EditDeleteButtons
          onClose={onShowEditDeleteButton}
          onEdit={onEdit}
          trpcString='skill.delete'
          invalidateQueries='user.getById'
          queryID={currentUser?.id}
          deleteItem={selectedItem}
        />
      )}
    </>
  );
}

type AddSkillsProps = {
  onShowAddEditForm: (show: boolean) => void;
  currentUser: any;
  selectedItem: SelectedItemTypes;
  resetSelectedItem: () => void;
};


function AddSkill({
  onShowAddEditForm,
  currentUser,
  selectedItem,
  resetSelectedItem,
}: AddSkillsProps) {
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
      client.invalidateQueries(['user.getById', { id: currentUser?.id }]);
    },
  });

  const { mutate: editSkillMutation } = trpc.useMutation(['skill.edit'], {
    onSuccess: () => {
      toast.success('Edit Skill Successful');
      client.invalidateQueries(['user.getById', { id: currentUser?.id }]);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (selectedItem) {
        editSkillMutation({
          ...data,
          id: selectedItem.id,
        });
        onShowAddEditForm(false);
        resetSelectedItem();
        return;
      }

      addSkill({
        ...data,
        userId: currentUser?.id,
      });
      onShowAddEditForm(false);
      resetSelectedItem();
    } catch (error) {
      toast.error('Please try again');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between border-b-2 border-b-black mb-4 pb-2'>
        {selectedItem ? (
          <h1 className='text-xl'>Add New Education</h1>
        ) : (
          <h1 className='text-xl'>Add Skill</h1>
        )}

        <AiFillCloseCircle
          className='text-2xl hover:opacity-50 cursor-pointer text-red-600'
          onClick={() => {
            onShowAddEditForm(false);
            resetSelectedItem();
          }}
        />
      </div>

      <Input
        label={'Name'}
        register={register('name', {
          required: true,
          value: selectedItem?.name,
        })}
      />

      <label className='block'>
        <span className='text-gray-700'>Skill Section</span>
        <select
          {...register('skill', { value: selectedItem.skill })}
          className='mt-1 block w-full h-8 px-2  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        >
          <option value='FRAMEWORKS'>Framework</option>
          <option value='SYSTEMS'>Systems</option>
          <option value='LANGUAGES'>Languages</option>
        </select>
      </label>

      <FormButton isLoading={isLoading} />
    </Form>
  );
}
