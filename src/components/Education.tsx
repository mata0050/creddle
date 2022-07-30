import React, { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import toast from 'react-hot-toast';
import { DatePicker } from '@mantine/dates';
import { AiFillCloseCircle } from 'react-icons/ai';
import EditDeleteButtons from './Layout/EditDeleteButtons';
import Input from './Layout/Input';
import Form from './Layout/Form';
import FormButton from './Layout/FormButton';
import Heading from './Layout/Heading';
import Button from './Layout/Button';
import { UserProfileType } from '~/context/UserContext';

export default function Education({ currentUser }: {currentUser: UserProfileType}): JSX.Element {
  const [editEducation, setEditEducation] = useState({});
  const [createEditEducation, setCreateEditEducation] = useState(false);
  const onCreateEditEducation = () =>
    setCreateEditEducation((prevSate) => !prevSate);


  return (
    <div className='mt-6'>
      <EducationHeading onCreateEditEducation={onCreateEditEducation} />

      {createEditEducation && (
        <CreateEditEducation
          onCreateEditEducation={onCreateEditEducation}
          editEducation={editEducation}
          setEditEducation={setEditEducation}
          currentUser={currentUser}
        />
      )}

      {!createEditEducation && (
        <>
          {currentUser?.education.map((data: any, index: any) => (
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
      <Heading heading='Education' />

      <Button title='Add New Education' onClick={onCreateEditEducation} />
    </div>
  );
}

function ViewEducation({
  education,
  editEducation,
  setEditEducation,
  onCreateEditEducation,
  currentUser,
}: any) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

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
        <DeleteEducation
          education={education}
          setEditEducation={setEditEducation}
          setShowDeleteButton={setShowDeleteButton}
          onCreateEditEducation={onCreateEditEducation}
          currentUser={currentUser}
        />
      )}
    </>
  );
}

function DeleteEducation({
  education,
  setEditEducation,
  setShowDeleteButton,
  onCreateEditEducation,
  currentUser,
}: any) {
  const onEdit = () => {
    setEditEducation(education);
    setShowDeleteButton(false);
    onCreateEditEducation();
  };

  return (
    <EditDeleteButtons
      onClose={() => setShowDeleteButton(false)}
      onEdit={onEdit}
      trpcString='education.delete'
      invalidateQueries='user.getById'
      queryID={currentUser.id}
      deleteItem={education}
    />
  );
}

function CreateEditEducation({
  onCreateEditEducation,
  editEducation,
  setEditEducation,
  currentUser,
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
        client.invalidateQueries(['user.getById', { id: currentUser.id }]);
      },
    }
  );

  const { mutate: editUser } = trpc.useMutation(['education.edit'], {
    onSuccess: () => {
      toast.success('Edit Education Successful');
      client.invalidateQueries(['user.getById', { id: currentUser.id }]);
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
          userId: currentUser.id,
        });
        return onCreateEditEducation();
      }

      addEducation({
        ...data,
        startDate,
        endDate,
        userId: currentUser.id,
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
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <Input
          label='School'
          register={register('school', {
            required: true,
            value: editEducation?.school,
          })}
        />

        <Input
          label='degree'
          register={register('degree', { value: editEducation?.degree })}
        />

        <Input
          label='Field'
          register={register('field', { value: editEducation?.field })}
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

        <FormButton isLoading={isLoading} />
      </Form>
    </div>
  );
}
