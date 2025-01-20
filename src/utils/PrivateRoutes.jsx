import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { baseUrl } from "./baseUrl";
import { useUserContext } from "./useUserContext";

function PrivateRoutes({ children }) {
    const   {user, setUser} = useUserContext(); 
  const [isValid, setIsValid] = useState(null); 
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false); 
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/api/users/validate-super-admin`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        const result = await response.json();
        if (response.ok && result.isValid) {
          setIsValid(true); 
        } else {
          setIsValid(false); 
        }
      } catch (e) {
        console.log(e.message);
        setIsValid(false); 
      }
    };
    if(!user){ 
        validateToken();
    }
  }, [user, setUser]);

  if (isValid === null) {
    return null; 
  }

  if (isValid) {
    return children; 
  }

  return <Navigate to="/" />; 
}

export default PrivateRoutes;
