import { Routes, Route } from 'react-router';
import { Login } from '@/components/login';
import { Dash } from '@/components/dash';
import { EventDetails } from '@/components/event-details';
import { Profile } from '@/components/profile';
import { SiteHeader } from './components/site-header';
import { useContext } from 'react';
import { LocalStorageContext } from './context/local-storage';

function App() {
  const { language } = useContext(LocalStorageContext);
  return (
    <div
      className="flex flex-col min-h-screen w-full"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="flex flex-1 pb-24">
        <main className="flex-1">
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
    </div>
  );
}

export default App;
