import React from 'react';
import { AiFillCloseCircle, AiOutlineDelete } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';

export default function EditDeleteButtons({ onClose, onEdit, onDelete }: any) {
  return (
    <div className="border border-black rounded h-36 flex justify-center items-center gap-4 relative">
      <AiFillCloseCircle
        className="text-3xl hover:opacity-50 cursor-pointer text-red-600 absolute right-6 top-6"
        onClick={onClose}
      />

      <div
        className="flex gap-2 p-2 bg-gray-400 text-white w-[120px] rounded hover:opacity-60 cursor-pointer"
        onClick={onEdit}>
        <p className="text-sm"> Click to Edit</p>
        <GrEdit className="text-lg  text-white" />
      </div>

      <div
        className="flex gap-2 p-2 bg-gray-300 text-red-600 w-[135px] rounded hover:opacity-60 cursor-pointer"
        onClick={onDelete}>
        <p className="text-sm">Click to Delete</p>
        <AiOutlineDelete className="text-lg text-red-600  " />
      </div>
    </div>
  );
}
