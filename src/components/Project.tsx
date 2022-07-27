import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import superjson from "superjson";
import moment from "moment";
import toast from "react-hot-toast";
import { DatePicker } from "@mantine/dates";
import { AiFillCloseCircle } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import Input from "./Layout/Input";
import Form from "./Layout/Form";
import FormButton from "./Layout/FormButton";
import EditDeleteButtons from "./Layout/EditDeleteButtons";
import { useAllUserContext } from "~/context/UserContext";
import Heading from "./Layout/Heading";

export default function Project() {
  const { selectedUser } = useAllUserContext();
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery([
    "project.getById",
    { id: selectedUser?.id },
  ]);
  return (
    <div className='mt-8'>
      <ViewProject projects={data} />
    </div>
  );
}

function ViewProject({ projects }: any) {
  return (
    <div>
      <Heading heading='Project' />

      {projects !== undefined &&
        projects.map((project: any) => (
          <>
            <div className='flex justify-between'>
              <h3>{project.name}</h3>
              <p >{project.link}</p>
            </div>
          </>
        ))}
    </div>
  );
}
