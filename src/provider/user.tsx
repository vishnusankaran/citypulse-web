import * as React from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '@/context/user';
import { getCookie } from '@/lib/utils';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const logout = async (
    callback: (isLoggedOut: boolean) => void = () => {}
  ) => {
    const res = await fetch(
      import.meta.env.VITE_PUBLIC_API_ENDPOINT + '/github/logout',
      {
        headers: {
          Authorization: getCookie('session') || '',
        },
      }
    );
    if (res.ok) {
      setIsAuthenticated(false);
      setUser(null);
      typeof callback === 'function' && callback(true);
    } else {
      typeof callback === 'function' && callback(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_PUBLIC_API_ENDPOINT + '/profile',
        {
          headers: {
            Authorization: getCookie('session') || '',
          },
        }
      );
      const resJson = await res.json();
      setIsAuthenticated(res.status === 200);
      setUser(resJson?.data?.user);
      navigate('/');
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  React.useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        user,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
