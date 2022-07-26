import { createContext, useContext, useState } from "react";
import { trpc } from "../utils/trpc";

type UserContextType = {
  email: string;
  firstName: string;
  lastName: string;
  github: string;
  id: string;
  location: string;
  phone: string;
};

type GlobalContentType = {
  selectedUser: UserContextType | null;
  setSelectedUser: (user: UserContextType | null) => void;
  allUsers: UserContextType[] | [] | undefined;
};

export const UserContext = createContext<GlobalContentType>({
  selectedUser: null,
  setSelectedUser: () => {},
  allUsers: [],
});

export function UserContextProvided({ children }: any) {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(["user.getAllUsers"]);
  const [selectedUser, setSelectedUser] = useState<UserContextType | null>(data !== undefined && data[0])


  return (
    <div>
      <UserContext.Provider value={{ selectedUser, setSelectedUser, allUsers: data }}>
        {children}
      </UserContext.Provider>
    </div>
  );
}


export const useAllUserContext = () =>  useContext(UserContext);