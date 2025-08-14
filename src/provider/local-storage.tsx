import { useState, useEffect } from 'react';
import { LocalStorageContext } from '@/context/local-storage';

type UserProfile = {
  id: number;
  data: any;
  type: string | null;
};

export const LocalStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoritedEvents, setFavoritedEvents] = useState<any[]>(() => {
    const stored = localStorage.getItem('favoritedEvents');
    return stored ? JSON.parse(stored) : [];
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem('userProfile');
    return stored ? JSON.parse(stored) : null;
  });

  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('favoritedEvents', JSON.stringify(favoritedEvents));
  }, [favoritedEvents]);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    } else {
      localStorage.removeItem('userProfile');
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LocalStorageContext.Provider
      value={{
        favoritedEvents,
        setFavoritedEvents,
        userProfile,
        setUserProfile,
        language,
        setLanguage,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};
