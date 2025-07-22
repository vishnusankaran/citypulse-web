import * as React from 'react';

type UserContextType = {
  isAuthenticated: boolean;
  logout: (callback: () => void) => void;
  user: object | undefined | null;
  fetchProfile: () => void;
};

export const UserContext = React.createContext<UserContextType>({
  isAuthenticated: false,
  user: undefined,
  logout: () => {},
  fetchProfile: () => {},
});
