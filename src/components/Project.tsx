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
import EditDeleteButtons from './Layout/EditDeleteButtons';
import { UserProfileType } from '~/context/UserContext';
import Heading from './Layout/Heading';
import Button from './Layout/Button';
import TextArea from './Layout/TextArea';

export default function Project({
  currentUser,
}: {
  currentUser: UserProfileType;
}): JSX.Element {
  const [editProject, setEditProject] = useState({});
  const [showAddEditProject, setShowAddEditProject] = useState(false);

  const onShowAddEditProject = () =>
    setShowAddEditProject((prevState) => !prevState);

  return (
    <div className='mt-8'>
      <HeadingProject
        onShowAddEditProject={onShowAddEditProject}
        setEditProject={setEditProject}
      />

      {showAddEditProject && (
        <AddEditProject
          currentUser={currentUser}
          onShowAddEditProject={onShowAddEditProject}
          editProject={editProject}
          setEditProject={setEditProject}
        />
      )}

      {showAddEditProject || (
        <ViewProject
          projects={currentUser?.projects}
          onClick={setEditProject}
          onShowAddEditProject={onShowAddEditProject}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}

// function Index({chidren}:a) {
//   return(
//     <div>
//       {children}
//     </div>
//   )
// }

function HeadingProject({ onShowAddEditProject, setEditProject }: any) {
  return (
    <>
      <Heading heading='Project' />
      <Button
        title='Add Project'
        onClick={() => {
          onShowAddEditProject();
          setEditProject({});
        }}
      />
    </>
  );
}

function ViewProject({
  projects,
  onClick,
  onShowAddEditProject,
  currentUser,
}: any) {
  const [showEditDeleteButton, setShowEditDeleteButton] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const onClickEditDeleteButton = (project: any) => {
    setShowEditDeleteButton((prevState) => !prevState);
    setSelectedProject(project);
  };

  const onEdit = () => {
    onClick(selectedProject);
    onShowAddEditProject();
  };

  return (
    <>
      {showEditDeleteButton && (
        <EditDeleteButtons
          onClose={onClickEditDeleteButton}
          onEdit={onEdit}
          trpcString='project.delete'
          invalidateQueries='project.getById'
          queryID={currentUser.id}
          deleteItem={selectedProject}
        />
      )}

      {projects !== undefined &&
        !showEditDeleteButton &&
        projects.map((project: any) => (
          <div
            className='mb-4 p-3  hover:border-[1px] cursor-pointer border-black rounded'
            key={project.id}
            onClick={() => {
              onClickEditDeleteButton(project);
            }}
          >
            <div className='flex justify-between mb-2'>
              <h3 className='text-xl '>{project.name}</h3>
              <p className='w-36 text-ellipsis overflow-hidden'>
                {project.link}
              </p>
            </div>

            <div className='flex items-center gap-2 mb-2'>
              <p className='text-sm'>
                {moment(project.startDate).format('MMMM Do YYYY')}
              </p>
              <span>to</span>
              <p className='text-sm'>
                {moment(project.endDate).format('MMMM Do YYYY')}
              </p>
            </div>

            <p>{project.description}</p>
          </div>
        ))}
    </>
  );
}

function AddEditProject({
  currentUser,
  onShowAddEditProject,
  editProject,
  setEditProject,
}: any) {
  const [startDate, setStartDate] = useState<Date | null>(
    editProject ? editProject.startDate : new Date()
  );
  const [endDate, setEndDate] = useState<Date | null>(
    editProject ? editProject.endDate : new Date()
  );

  const client = trpc.useContext();
  const { mutate: addProject, isLoading } = trpc.useMutation(['project.add'], {
    onSuccess: () => {
      toast.success('Adding Project Successful');
      client.invalidateQueries(['project.getById', { id: currentUser.id }]);
    },
  });

  const { mutate: editProjectMutation, isLoading: editLoading } =
    trpc.useMutation(['project.edit'], {
      onSuccess: () => {
        toast.success('Edit Project Successful');
        client.invalidateQueries(['project.getById', { id: currentUser.id }]);
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (Object.keys(editProject).length !== 0) {
        editProjectMutation({
          ...data,
          startDate,
          endDate,
          userId: currentUser.id,
          id: editProject.id,
        });
        return onShowAddEditProject();
      }

      addProject({
        ...data,
        startDate,
        endDate,
        userId: currentUser.id,
      });
      onShowAddEditProject();
    } catch (error) {
      toast.error('Please Filling out the project again');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between border-b-2 border-b-black mb-4 pb-2'>
          <h1 className='text-xl'>Add Project</h1>

          <AiFillCloseCircle
            className='text-2xl hover:opacity-50 cursor-pointer text-red-600'
            onClick={() => {
              onShowAddEditProject();
              setEditProject({});
            }}
          />
        </div>

        <Input
          label='Name'
          register={register('name', {
            required: true,
            value: editProject?.name,
          })}
        />

        <Input
          label='Link'
          register={register('link', {
            required: true,
            value: editProject?.link,
          })}
        />

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

        <TextArea
          label='Description'
          register={register('description', {
            required: true,
            value: editProject?.description,
          })}
        />
        <FormButton isLoading={isLoading} />
      </Form>
    </>
  );
}
