import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import superjson from "superjson";
import moment from "moment";
import toast from "react-hot-toast";
import { DatePicker } from "@mantine/dates";
import { AiFillCloseCircle } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import Input from "./Layout/Input";
import Form from "./Layout/Form";
import FormButton from "./Layout/FormButton";
import EditDeleteButtons from "./Layout/EditDeleteButtons";
import { useAllUserContext } from "~/context/UserContext";
import Heading from "./Layout/Heading";
import Button from "./Layout/Button";
import TextArea from "./Layout/TextArea";

export default function Project() {
  const { selectedUser } = useAllUserContext();
  const [showAddProject, setShowAddProject] = useState(false);
  const onShowAddProject = () => setShowAddProject((prevState) => !prevState);

  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery([
    "project.getById",
    { id: selectedUser?.id },
  ]);

  console.log(showAddProject);

  return (
    <div className='mt-8'>
      <HeadingProject onShowAddProject={onShowAddProject} />

      {showAddProject && (
        <AddProject
          selectedUser={selectedUser}
          onShowAddProject={onShowAddProject}
        />
      )}

      {showAddProject || <ViewProject projects={data} />}
    </div>
  );
}

function HeadingProject({ onShowAddProject }: any) {
  return (
    <>
      <Heading heading='Project' />
      <Button title='Add Project' onClick={onShowAddProject} />
    </>
  );
}

function ViewProject({ projects }: any) {
  return (
    <>
      {projects !== undefined &&
        projects.map((project: any) => (
          <div className='mb-4' key={project.id}>
            <div className='flex justify-between mb-2'>
              <h3 className='text-xl '>{project.name}</h3>
              <p className='w-36 text-ellipsis overflow-hidden'>
                {project.link}
              </p>
            </div>

            <div className='flex items-center gap-2 mb-2'>
              <p className='text-sm'>
                {moment(project.startDate).format("MMMM Do YYYY")}
              </p>
              <span>to</span>
              <p className='text-sm'>
                {moment(project.endDate).format("MMMM Do YYYY")}
              </p>
            </div>

            <p>{project.description}</p>
          </div>
        ))}
    </>
  );
}

function AddProject({ selectedUser, onShowAddProject }: any) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const client = trpc.useContext();
  const { mutate: addProject, isLoading } = trpc.useMutation(["project.add"], {
    onSuccess: () => {
      toast.success("Adding Project Successful");
      client.invalidateQueries(["project.getById", { id: selectedUser.id }]);
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
      addProject({
        ...data,
        startDate,
        endDate,
        userId: selectedUser.id,
      });
    } catch (error) {
      toast.error("Please Filling out the project again");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between border-b-2 border-b-black mb-4 pb-2'>
          <h1 className='text-xl'>Add Project</h1>

          <AiFillCloseCircle
            className='text-2xl hover:opacity-50 cursor-pointer text-red-600'
            onClick={onShowAddProject}
          />
        </div>

        <Input
          label='Name'
          register={register("name", {
            required: true,
            //  \value: editEducation?.school,
          })}
        />

        <Input
          label='Link'
          register={register("link", {
            required: true,
            //  \value: editEducation?.school,
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
          register={register("description", {
            required: true,
            //  \value: editEducation?.school,
          })}
        />
        <FormButton isLoading={isLoading} />
      </Form>
    </>
  );
}
