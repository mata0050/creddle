import React from "react";

export default function Heading({ heading }: { heading: string }) {
  return (
    <div className='flex justify-between border-b-2 border-b-black my-4'>
      <h1 className='text-3xl'>{heading}</h1>
    </div>
  );
}
