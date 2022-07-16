import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <nav className='bg-lightGrey b border-b-4 flex justify-between items-center p-4'>
      <ul className='flex gap-4'>
        <li className='opacity-70 hover:opacity-100'>
          <a href='/content'>Content</a>
        </li>
        <li className='opacity-70 hover:opacity-100'>
          <a href='/resume'>Resume</a>
        </li>
      </ul>

      <h3 className='text-3xl text-green hover:opacity-80'>
        <Link href='/'>
          <a>Creddle</a>
        </Link>
      </h3>
    </nav>
  );
}

export default Navbar;
