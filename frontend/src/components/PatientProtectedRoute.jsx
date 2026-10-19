
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/axios";

function PatientProtectedRoute() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    const verifyPatient = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setStatus("unauthorized");
        return;
      }

      try {
        await api.get("/api/patient/profile/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!cancelled) {
          setStatus("authorized");
        }
      } catch {
        if (!cancelled) {
          setStatus("unauthorized");
        }
      }
    };

    verifyPatient();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Preparing your private space...</p>
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default PatientProtectedRoute;
