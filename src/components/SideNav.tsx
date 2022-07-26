import Link from "next/link";
import React from "react";

function SideNav() {
  return (
    <div className="h-screen bg-darkGrey w-[230px] fixed z-0 pt-20 text-white">
      <aside>
        <ul className="flex flex-col gap-4 items-start ">
          <li className="hover:opacity-50 border-b-[1px] w-full pb-2 pl-4 font-thin text-sm">
            <Link href="/basic-information">
              <a className="">Basic Information</a>
            </Link>
          </li>

          <li className="hover:opacity-50 border-b-[1px] w-full pb-2 pl-4 font-thin text-sm">
            <Link href="/education">
              <a>Education</a>
            </Link>
          </li>

          <li className="hover:opacity-50 border-b-[1px] w-full pb-2 pl-4 font-thin text-sm">
            <Link href="/skills">
              <a>Skills</a>
            </Link>
          </li>

          <li className="hover:opacity-50 border-b-[1px] w-full pb-2 pl-4 font-thin text-sm">
            <Link href="/projects">
              <a>Projects</a>
            </Link>
          </li>

          <li className="hover:opacity-50 border-b-[1px] w-full pb-2 pl-4 font-thin text-sm">
            <Link href="/employment">
              <a>Employment</a>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default SideNav;
