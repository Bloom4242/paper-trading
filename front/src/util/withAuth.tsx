// withAuth.tsx
import React, { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface DecodedToken {
  exp: number;
  [key: string]: any; // Add any other expected fields from your token here
}
function getCookie(key: string): string | undefined {
    const match = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
    return match ? match.pop() : undefined;
  }
const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const token = getCookie('token'); // Assuming the JWT is stored in local storage
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate('/');
      } else {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          // Check if the token is expired
          const isExpired = decodedToken.exp * 1000 < Date.now();
          if (isExpired) {
            localStorage.removeItem('token');
            navigate('/');
          }
        } catch (error) {
          console.error('Invalid token', error);
          navigate('/');
        }
      }
    }, [token, navigate]); // Add token and navigate to dependency array

    // If the user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
