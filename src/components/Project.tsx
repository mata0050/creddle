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

export default function Project() {
    const { selectedUser } = useAllUserContext();
    const utils = trpc.useContext();
    const { data, isLoading } = trpc.useQuery([
      "education.getById",
      { id: selectedUser?.id },
    ]);
  return (
    <div>Project</div>
  )
}


function ViewProject(){
    return(<div>

    </div>)
}