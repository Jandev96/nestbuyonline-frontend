import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/user/Header';
import Footer from '../components/user/Footer';
import UserHeader from '../components/user/UserHeader';

function RootLayout() {
  const location = useLocation();
  const [isUserAuth, setIsAuth] = useState(true);

  // ✅ Hide navbar & footer on login and signup pages
  const hideNavbarFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && (isUserAuth ? <UserHeader /> : <Header />)}
      
      <div className='min-h-screen'>
        <Outlet />
      </div>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default RootLayout;
