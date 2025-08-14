import { Navigate, Outlet } from "react-router";
import useAuth from "./hooks/useAuth";

function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // console.log(user);

  // If no user or not admin → send to login
  if (!user || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // If authenticated admin → render protected route content
  return <Outlet />;
}

export default AdminRoute;
