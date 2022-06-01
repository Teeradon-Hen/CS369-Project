import { useAuth } from "./Authentication";
import { useLocation, Navigate } from "react-router-dom";
export default function RequireAuth({ children }) {
     let auth = useAuth();
     let location = useLocation();
     if (!auth.isAuthenticated()) {
          console.log(auth.isAuthenticated())
          // Redirect unauthorized user to the /login page, but save the current location they were    
          return <Navigate to="/" state={{ from: location }} replace />;
     }
     return children;
} 