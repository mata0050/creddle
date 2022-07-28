import React from "react";
import { useAllUserContext } from "~/context/UserContext";

export default function SelectUser() {
  const { allUsers, setSelectedUser } = useAllUserContext();

  const onChange = (event: any) => {
    const user = allUsers?.filter((user) => user.id === event.target.value)[0];
    setSelectedUser(user);
  };

  return (
    <div className='p-3 bg-darkGrey  mb-6 rounded'>
      <label className='block '>
        <span className='text-white text-xl block mb-2'>Select a User</span>
        <select
          className='mt-1 block w-full h-8 px-2  rounded-md border-[1px] border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          onChange={(e) => onChange(e)}>
          {allUsers?.map((user: any) => (
            <option value={user?.id} key={user.id}>
              {`${user.firstName} ${user.lastName}`}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
