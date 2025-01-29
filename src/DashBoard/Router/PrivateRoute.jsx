import { Spin } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "superAdmin") {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spin size="large"></Spin>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
