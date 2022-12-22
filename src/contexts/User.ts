import { createContext } from "react";

export type User = {
    name: string;
    email: string;
    role: string;
    id: string;
} | null;

export type UserContextType = {
    user: User ;
    setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

export default UserContext;
