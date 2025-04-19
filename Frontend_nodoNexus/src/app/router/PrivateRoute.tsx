import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const PrivateRoute = ({
  role,
  component: Component,
}: {
  role: string;
  component: React.ComponentType;
}) => {
  const user = useSelector((state: RootState) => state.auth);

  if (!user || user.user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};
