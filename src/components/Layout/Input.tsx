import React from "react";

type Props = {
  label: string;
  register: any;
};

export default function Input({ label, register }: Props) {
  return (
    <>
      <label className='block'>
        <span className='text-gray-700'>{label}</span>
        <input
          type='text'
          className='mt-1 block w-full h-8 px-2  rounded-md border-gray-300 border-[1px] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          {...register}
        />
      </label>
    </>
  );
}
