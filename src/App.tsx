import { Routes, Route } from 'react-router';
import { Login } from '@/components/login';
import { Dash } from '@/components/dash';
import { EventDetails } from '@/components/event-details';
import { Profile } from '@/components/profile';
import { SiteHeader } from './components/site-header';
import { useContext } from 'react';
import { LocalStorageContext } from './context/local-storage';
import { UserContext } from './context/user';
import { ToggleRadioGroup } from '@/components/toggle-radio-group';

function App() {
  const { language, setLanguage } = useContext(LocalStorageContext);
  const { user } = useContext(UserContext);
  return (
    <div
      className="flex flex-col min-h-screen w-full"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className={`flex flex-1 pb-24 lg:${!user ? 'pb-0' : 'pb-24'}`}>
        <main className="flex flex-1 justify-center">
          <Routes>
            <Route path="/" element={<Dash />} />
            <Route path="/dashboard" element={<Dash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/event/:eventId" element={<EventDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
      <SiteHeader />

      <span
        dir="ltr"
        className={`fixed top-4 right-4 z-50 hidden lg:${
          !user ? 'block' : 'hidden'
        }`}
      >
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
      </span>
    </div>
  );
}

export default App;
