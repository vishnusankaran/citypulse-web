import * as React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router';

import { UserContext } from '@/context/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToggleRadioGroup } from '@/components/toggle-radio-group';
import { LocalStorageContext } from '@/context/local-storage';

export function SiteHeader() {
  const { user, logout, isAuthenticated } = React.useContext(UserContext);
  const { language, setLanguage } = React.useContext(LocalStorageContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout(() => {
      navigate('/login');
    });
  };

  return (
    <header
      dir="ltr"
      className={`bg-white fixed bottom-0 left-0 right-0 items-center justify-between px-8 py-6 border-b w-full border-1 border-gray-100 flex lg:hidden`}
      style={{
        display: isAuthenticated ? 'flex' : 'none',
      }}
    >
      <div className="w-24">
        <ToggleRadioGroup
          options={[
            {
              value: 'en',
              label: 'EN',
            },
            {
              value: 'ar',
              label: 'AR',
            },
          ]}
          onValueChange={setLanguage}
          value={language}
        />
      </div>
      <div className="flex items-center justify-center gap-2 grow flex-1">
        <h1
          className="text-2xl font-bold tracking-tight cursor-pointer"
          onClick={() => navigate('/')}
        >
          CityPulse
        </h1>
      </div>
      <div className="w-24 justify-end flex items-center">
        {user && (
          <DropdownMenu dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <DropdownMenuTrigger>
              <Avatar className="border-2 border-gray-200 w-12 h-12">
                <AvatarImage src={user?.data?.avatar_url} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleProfileClick}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
