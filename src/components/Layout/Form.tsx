import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function Form({ props, children }: any) {
  return (
    <div className='my-6'>
      <form
        className='grid grid-cols-1 gap-y-4  p-8 rounded-lg box-shadow'
        {...props}
      >
        {children}
      </form>
    </div>
  );
}
