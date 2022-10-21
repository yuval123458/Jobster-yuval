import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return props.children;
};

export default ProtectedRoute;
