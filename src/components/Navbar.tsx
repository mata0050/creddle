import React from 'react';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <a href='/content'>Content</a>
        </li>
        <li>
          <a href='/resume'>Resume</a>
        </li>
      </ul>

      <h3 className='text-3xl'>Creddle</h3>
    </nav>
  );
}

export default Navbar;
