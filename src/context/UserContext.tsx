import { createContext, useContext, useState } from 'react';
import { trpc } from '../utils/trpc';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  github: string;
  location: string;
  phone: string;
};

type UsersProfileType =
  | (User & {
      education: Education[];
      skills: Skill[];
      projects: Project[];
      employment: Employment[];
    })[]
  | undefined;

export type UserProfileType =
  | (User & {
      education: Education[];
      skills: Skill[];
      projects: Project[];
      employment: Employment[];
    })
  | undefined;

type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date;
  userId: string | null;
};

export type Skill = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  name: string;
  skill: string;
};

export type Skills = {
  frameworks: Skill[];
  system: Skill[];
  languages: Skill[];
};

type Project = {
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

type Employment = {
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
  allUsers: UsersContextType;
  refetchAllUsers: () => void;
};

export const UserContext = createContext<GlobalContentType>({
  selectedUser: undefined,
  allUsers: undefined,
  refetchAllUsers: () => {},
});

export function UserContextProvided({ children }: any) {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(['user.getAllUsers']);

  let allUsers = data as UsersContextType;

  const [selectedUser, setSelectedUser] = useState<UserContextType>(
    allUsers !== undefined ? allUsers[0] : undefined
  );

  const refetchAllUsers = () => {
    const { data, isLoading } = trpc.useQuery(['user.getAllUsers']);
    const allUsers = data as UsersContextType;
    setSelectedUser(allUsers !== undefined ? allUsers[0] : undefined);
  };

  return (
    <div>
      <UserContext.Provider
        value={{ selectedUser, allUsers: data, refetchAllUsers }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
}

export const useAllUserContext = () => useContext(UserContext);
