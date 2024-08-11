///ProtecetdRoutes.tsx
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { FCC } from "../@types/types";

const ProtectedRoutes: FCC = ({ children }) => {
    useContext(AuthContext);


    return <>{children}</>;
};

export default ProtectedRoutes;