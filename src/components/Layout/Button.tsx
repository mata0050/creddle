import React from "react";


type Props ={
    title: string,
    onClick: () => void,
}

export default function Button({ onClick , title}: Props) {
  return (
    <button
      className='p-2 bg-gray-400 text-white rounded hover:opacity-70 text-sm mb-4'
      onClick={onClick}>
     {title}
    </button>
  );
}
