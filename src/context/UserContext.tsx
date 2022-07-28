import { createContext, useContext, useState } from "react";
import { trpc } from "../utils/trpc";

type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  github: string;
  location: string;
  phone: string;
};


type UsersContextType =
  | (UserType & {
      education: EducationType[];
      skills: SkillType[];
      projects: ProjectType[];
      employment: EmploymentType[];
    })[]
  | undefined;

type UserContextType =
  | (UserType & {
      education: EducationType[];
      skills: SkillType[];
      projects: ProjectType[];
      employment: EmploymentType[];
    })
  | undefined;

type EducationType = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date;
  userId: string | null;
};

type SkillType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  name: string;
  skill: string;
};

type ProjectType = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  link: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type EmploymentType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
  userId: string | null;
};

type GlobalContentType = {
  selectedUser: UserContextType;
  setSelectedUser: (user: UserContextType) => void;
  allUsers: UsersContextType;
};

export const UserContext = createContext<GlobalContentType>({
  selectedUser: undefined,
  setSelectedUser: () => {},
  allUsers: undefined,
});

export function UserContextProvided({ children }: any) {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(["user.getAllUsers"]);

  let allUsers = data as UsersContextType;

  const [selectedUser, setSelectedUser] = useState<UserContextType>(
    allUsers !== undefined ? allUsers[0] : undefined
  );

  return (
    <div>
      <UserContext.Provider
        value={{ selectedUser, setSelectedUser, allUsers: data }}>
        {children}
      </UserContext.Provider>
    </div>
  );
}

export const useAllUserContext = () => useContext(UserContext);
