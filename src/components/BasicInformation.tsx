import { useState } from "react";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GrEdit } from "react-icons/gr";
import { AiFillCloseCircle } from "react-icons/ai";
import Input from "./Layout/Input";
import TextArea from "./Layout/TextArea";
import FormButton from "./Layout/FormButton";
import Form from "./Layout/Form";
import { useAllUserContext } from '~/context/UserContext';

export default function BasicInformation() {
const {allUsers }  = useAllUserContext();

  const [showCreateUser, setShowCreateUser] = useState(false);
  const onShowCreateUser = () => setShowCreateUser((prevSate) => !prevSate);


  if (!allUsers) return <div>Loading...</div>;

  return (
    <>
      {!showCreateUser && (
        <ViewBasicInformation
          user={allUsers[0]}
          onShowCreateUser={onShowCreateUser}
        />
      )}
      {showCreateUser && (
        <CreateEditUser user={allUsers[0]} onShowCreateUser={onShowCreateUser} />
      )}
    </>
  );
}

function CreateEditUser({ onShowCreateUser, user }: any) {
  const client = trpc.useContext();
  const { mutate: newUser, isLoading } = trpc.useMutation(["user.add"], {
    onSuccess: () => {
      toast.success("Registration Successful");
      client.invalidateQueries("user.getAllUsers");
    },
  });

  const { mutate: editUser } = trpc.useMutation(["user.edit"], {
    onSuccess: () => {
      toast.success("Edit User Successful");
      client.invalidateQueries("user.getAllUsers");
    },
  });

  const onSubmit = async (data: any) => {
    if (data.email.split("@")[1] !== "gmail.com") {
      toast.error(
        "Please make sure Student Email Address is a Gmail email address"
      );
    }

    try {
      if (user) {
        editUser({ ...data, id: user.id });
        return onShowCreateUser();
      }
      newUser(data);
      onShowCreateUser();
    } catch (error) {
      toast.error("Please Filling out the application again");
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
          <h1 className='text-xl'>Basic Information</h1>

          <AiFillCloseCircle
            className='text-2xl hover:opacity-50 cursor-pointer text-red-600'
            onClick={onShowCreateUser}
          />
        </div>

        <Input
          label='First Name'
          register={register("firstName", {
            required: true,
            value: user?.firstName,
          })}
        />

        <Input
          label='Last Name'
          register={register("lastName", {
            required: true,
            value: user?.lastName,
          })}
        />

        <Input
          label='Phone Number'
          register={register("phone", { required: true, value: user?.phone })}
        />

        <Input
          label='Email'
          register={register("email", { required: true, value: user?.email })}
        />

        <Input
          label='Github Username'
          register={register("github", { required: true, value: user?.github })}
        />

        <Input
          label='Location'
          register={register("location", {
            required: true,
            value: user?.location,
          })}
        />

        <TextArea
          label='Summary'
          register={register("summary", {
            required: true,
            value: user?.summary,
          })}
        />

        <FormButton isLoading={isLoading} />
      </Form>
    </div>
  );
}

function ViewBasicInformation({ user, onShowCreateUser }: any) {
  return (
    <div>
      <div className='flex justify-between border-b-2 border-b-black mb-4'>
        <h1 className='text-3xl'>Basic Information</h1>

        <GrEdit
          className='text-xl hover:opacity-50 cursor-pointer'
          onClick={onShowCreateUser}
        />
      </div>

      <p className='opacity-70'>{user?.firstName}</p>
      <p className='opacity-70'>{user?.lastName}</p>
      <p className='opacity-70'>{user?.email}</p>
      <p className='opacity-70'>{user?.phone}</p>
      <p className='opacity-70'>{`github.com/${user?.github}`}</p>
      <p className='opacity-70'>{user?.location}</p>

      <h2 className='text-3xl my-4 border-b-2 border-b-black pb-2'>Summary</h2>
      <p>{user?.summary}</p>
    </div>
  );
}
