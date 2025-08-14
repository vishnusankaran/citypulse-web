import * as React from 'react';
import { UserContext } from '@/context/user';
import { getCookie } from '@/lib/utils';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const logout = React.useCallback(
    async (callback: (isLoggedOut: boolean) => void = () => {}) => {
      const res = await fetch(
        import.meta.env.VITE_PUBLIC_API_ENDPOINT + '/github/logout',
        {
          headers: {
            Authorization: getCookie('session') || '',
          },
          credentials: 'include',
        }
      );
      if (res.ok) {
        setIsAuthenticated(false);
        setUser(null);
        typeof callback === 'function' && callback(true);
      } else {
        typeof callback === 'function' && callback(false);
      }
    },
    []
  );

  const fetchProfile = React.useCallback(async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_PUBLIC_API_ENDPOINT + '/profile',
        {
          headers: {
            Authorization: getCookie('session') || '',
          },
          credentials: 'include',
        }
      );
      const resJson = await res.json();
      setIsAuthenticated(res.status === 200);
      setUser(resJson?.data?.user);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  }, []);

  React.useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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
