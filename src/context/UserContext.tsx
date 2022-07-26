import { createContext, useContext } from "react";
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
  allUsers: UserContextType[] | [] | undefined;
};

export const UserContext = createContext<GlobalContentType>({
  selectedUser: null,
  allUsers: [],
});

export function UserContextProvided({ children }: any) {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(["user.getAllUsers"]);

  
  return (
    <div>
      <UserContext.Provider value={{ selectedUser: null, allUsers: data }}>
        {children}
      </UserContext.Provider>
    </div>
  );
}


export const useAllUserContext = () =>  useContext(UserContext);