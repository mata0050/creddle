import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import Input from "./Layout/Input";
import Form from "./Layout/Form";
import FormButton from "./Layout/FormButton";
import EditDeleteButtons from "./Layout/EditDeleteButtons";
import { useAllUserContext } from "~/context/UserContext";
import Heading from "./Layout/Heading";
import Button from "./Layout/Button";

export default function Skill() {
  const [editEducation, setEditEducation] = useState({});
  const { selectedUser } = useAllUserContext();

  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery([
    "skill.getById",
    { id: selectedUser?.id },
  ]);
  const [addSkill, setAddSkill] = useState(false);

  const onShowSkill = () => setAddSkill((prevState) => !prevState);

  const [createEditEducation, setCreateEditEducation] = useState(false);

  const onCreateEditEducation = () =>
    setCreateEditEducation((prevSate) => !prevSate);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className='mt-6'>
      <Heading heading='Skills' />
      {addSkill && (
        <AddSkill onShowSkill={onShowSkill} selectedUser={selectedUser} />
      )}
      <ViewSkills skills={data} onShowSkill={onShowSkill} />
    </div>
  );
}

function ViewSkills({ skills, onShowSkill }: any) {
  const [showEditDeleteButton, setShowEditDeleteButton] = useState(false);

  const onShowEditDeleteButton = () =>
    setShowEditDeleteButton((prevState) => !prevState);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    name: "",
    skill: "",
  });

  const selectItem = ({ id, name, skill }: any) => {
    setSelectedItem({ id: id, name, skill });
    onShowEditDeleteButton();
  };

  const onEdit = () => {
    onShowEditDeleteButton();
    onShowSkill();
  };

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
              className='opacity-70 border border-black px-3 rounded inline-block'>
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
          <Button title='Add Skill' onClick={onShowSkill} />

          {skills.frameworks.length !== 0 && (
            <Skills title='Frameworks' skills={skills} section='frameworks' />
          )}

          {skills.system.length !== 0 && (
            <Skills title='Systems' skills={skills} section='system' />
          )}

          {skills.languages.length !== 0 && (
            <Skills title='Languages' skills={skills} section='languages' />
          )}
        </>
      )}

      {showEditDeleteButton && (
        <EditDeleteButtons
          onClose={onShowEditDeleteButton}
          onEdit={""}
          trpcString='skill.delete'
          invalidateQueries='skill.getById'
          queryID='4e06def1-53e4-436a-894d-7260814df125'
          deleteItem={selectedItem}
        />
      )}
    </>
  );
}

function AddSkill({ onShowSkill, selectedUser }: any) {
  const client = trpc.useContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: addSkill, isLoading } = trpc.useMutation(["skill.add"], {
    onSuccess: () => {
      toast.success("Add Skill Successful");
      client.invalidateQueries(["skill.getById", { id: selectedUser?.id }]);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      addSkill({
        ...data,
        userId: selectedUser?.id,
      });
      onShowSkill();
    } catch (error) {
      toast.error("Please try again");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-between border-b-2 border-b-black mb-4 pb-2'>
        {/* {Object.keys(editEducation).length === 0 ? (
          <h1 className='text-xl'>Add New Education</h1>
        ) : (
        )} */}
        <h1 className='text-xl'>Add Skill</h1>

        <AiFillCloseCircle
          className='text-2xl hover:opacity-50 cursor-pointer text-red-600'
          onClick={() => {
            onShowSkill();
          }}
        />
      </div>

      <Input
        label={"Name"}
        register={register("name", {
          required: true,
          value: "",
        })}
      />

      <label className='block'>
        <span className='text-gray-700'>Skill Section</span>
        <select
          {...register("skill", { value: "" })}
          className='mt-1 block w-full h-8 px-2  rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
          <option value='FRAMEWORKS'>Framework</option>
          <option value='SYSTEMS'>Systems</option>
          <option value='LANGUAGES'>Languages</option>
        </select>
      </label>

      <FormButton isLoading={isLoading} />
    </Form>
  );
}
