import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../../config/routes";
import { RootState } from "../../app/store";

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = (
  <Navigate replace to={PrivateRoutes.PRIVATE} />
);

export const AuthGuard = ({ privateValidation }: Props) => {
  const userState = useSelector((store: RootState) => store.auth);
  return userState.user ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate to={PublicRoutes.LOGIN} replace />
  );
};

export default AuthGuard;
