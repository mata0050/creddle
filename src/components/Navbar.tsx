import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <nav className='bg-lightGrey b border-b-4 flex justify-between items-center py-3 px-10 fixed w-full z-10'>
      <ul className='flex gap-4'>
        <li className='opacity-70 hover:opacity-100'>
          <Link href='/content'>
            <a>Content</a>
          </Link>
        </li>
        <li className='opacity-70 hover:opacity-100'>
          <Link href='/resume'>
            <a>Resume</a>
          </Link>
        </li>
      </ul>

      <h3 className='text-xl text-green hover:opacity-80'>
        <Link href='/'>
          <a>Creddle</a>
        </Link>
      </h3>
    </nav>
  );
}

export default Navbar;
