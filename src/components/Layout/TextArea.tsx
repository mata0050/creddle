import React from "react";

type Props = {
  label: string;
  register: any;
};

export default function TextArea({ label, register }: Props) {
  return (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      <textarea
        className="mt-1 block w-full h-24 px-2  rounded-md border-[1px] border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        {...register}
      />
    </label>
  );
}
