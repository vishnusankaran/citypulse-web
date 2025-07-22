import * as React from 'react';
import { UserContext } from '@/context/user';
import { Button } from '@/components/ui/button';

export const Account = () => {
  const { user, logout, fetchProfile } = React.useContext(UserContext);

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      {!user ? (
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href={`${import.meta.env.VITE_PUBLIC_API_ENDPOINT}/github/authorize`}
          rel="origin"
        >
          Login with Github
        </a>
      ) : (
        <div>
          <span>{user?.type}</span> - <span>{user?.data?.login}</span>
          <Button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};
