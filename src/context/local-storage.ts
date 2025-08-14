import * as React from 'react';

type UserProfile = {
  id: number;
  data: any;
  type: string | null;
};

type LocalStorageContextType = {
  favoritedEvents: any[];
  setFavoritedEvents: (events: any[]) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  language: string;
  setLanguage: (lang: string) => void;
};

export const LocalStorageContext = React.createContext<LocalStorageContextType>({
  favoritedEvents: [],
  setFavoritedEvents: () => {},
  userProfile: null,
  setUserProfile: () => {},
  language: 'en',
  setLanguage: () => {},
});
