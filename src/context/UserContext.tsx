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
  selectedUser: UserContextType | { id: "" };
  setSelectedUser: (user: UserContextType | { id: "" }) => void;
  allUsers: UserContextType[] | [] | undefined;
};

export const UserContext = createContext<GlobalContentType>({
  selectedUser: {
    email: "",
    firstName: "",
    lastName: "",
    github: "",
    id: "",
    location: "",
    phone: "",
  },
  setSelectedUser: () => {},
  allUsers: [],
});

export function UserContextProvided({ children }: any) {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(["user.getAllUsers"]);
  const [selectedUser, setSelectedUser] = useState<
    UserContextType | { id: "" }
  >(data !== undefined ? data[0] : { id: "" });

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
