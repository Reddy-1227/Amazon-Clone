import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCart } from "../components/DataProvider/DataProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useCart();
  const location = useLocation();

  React.useEffect(() => {
    if (!user) {
      toast.info("You must be signed in to access this page.", {
        toastId: "protected-route",
      });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
