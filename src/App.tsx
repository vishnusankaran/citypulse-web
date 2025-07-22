import * as React from 'react';
import { Routes, Route } from 'react-router';
import { Login } from '@/components/login';
import { Dash } from '@/components/dash';

import { UserProvider } from '@/provider/user';
import { UserContext } from '@/context/user';

function App() {
  const { fetchProfile } = React.useContext(UserContext);

  React.useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
