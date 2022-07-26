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
    <div className="mt-6">
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
      <div className="flex justify-between border-b-2 border-b-black mb-4">
        <h1 className="text-3xl">Education</h1>
      </div>

      <button
        className="p-2 bg-gray-400 text-white rounded hover:opacity-70 text-sm mb-4"
        onClick={onCreateEditEducation}>
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

  return (
    <>
      {!showDeleteButton && (
        <div
          className="mb-4 hover:border hover:border-black hover:rounded	p-4 cursor-pointer"
          onClick={() => setShowDeleteButton(true)}>
          <>
            <p className="opacity-70 text-2xl">{education?.school}</p>
            <div className="flex mb-2 text-sm">
              <p className="opacity-70">
                {moment(education?.startDate).format('MMMM YYYY')}
              </p>
              <span className="mx-2">to</span>
              <p className="opacity-70">
                {moment(education?.endDate).format('MMMM YYYY')}
              </p>
            </div>
            <p className="opacity-70">{education?.degree}</p>
            <p className="opacity-70">{education?.field}</p>
          </>
        </div>
      )}

      {showDeleteButton && (
        <DeleteEducation
          education={education}
          setEditEducation={setEditEducation}
          setShowDeleteButton={setShowDeleteButton}
          onCreateEditEducation={onCreateEditEducation}
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
}: any) {
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
      <div className="border border-black rounded h-36 flex justify-center items-center gap-4 relative">
        <AiFillCloseCircle
          className="text-3xl hover:opacity-50 cursor-pointer text-red-600 absolute right-6 top-6"
          onClick={() => setShowDeleteButton(false)}
        />

        <div
          className="flex gap-2 p-2 bg-gray-400 text-white w-[120px] rounded hover:opacity-60 cursor-pointer"
          onClick={() => {
            setEditEducation(education);
            setShowDeleteButton(false);
            onCreateEditEducation();
          }}>
          <p className="text-sm"> Click to Edit</p>
          <GrEdit className="text-lg  text-white" />
        </div>

        <div
          className="flex gap-2 p-2 bg-gray-300 text-red-600 w-[135px] rounded hover:opacity-60 cursor-pointer"
          onClick={() => {
            onDeleteEducation();
            setShowDeleteButton(false);
          }}>
          <p className="text-sm">Click to Delete</p>
          <AiOutlineDelete className="text-lg text-red-600  " />
        </div>
      </div>
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
    <div className="mt-6 ">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between border-b-2 border-b-black mb-4 pb-2">
          {Object.keys(editEducation).length === 0 ? (
            <h1 className="text-xl">Add New Education</h1>
          ) : (
            <h1 className="text-xl">Edit Education</h1>
          )}

          <AiFillCloseCircle
            className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
            onClick={() => {
              onCreateEditEducation();
              setEditEducation({});
            }}
          />
        </div>

        <Input
          label="School"
          register={register('school', {
            required: true,
            value: editEducation?.school,
          })}
        />

        <Input
          label="degree"
          register={register('degree', { value: editEducation?.degree })}
        />

        <Input
          label="Field"
          register={register('field', { value: editEducation?.field })}
        />

        <DatePicker
          placeholder="Pick date"
          label="Start date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          required
        />

        <DatePicker
          placeholder="Pick date"
          label="End date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          required
        />

        <FormButton isLoading={isLoading} />
      </Form>
    </div>
  );
}
