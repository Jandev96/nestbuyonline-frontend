import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/user/Header';
import Footer from '../components/user/Footer';
import UserHeader from '../components/user/UserHeader';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { saveUser,clearUser } from '../redux/slices/userSlice';


export const RootLayout = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  console.log("user===", user);

  const dispatch = useDispatch();
  const location = useLocation();

  const checkUser = async () => {
      try {
          const response = await axiosInstance({ method: "GET", url: "/user/checkuser" });
          console.log(response, "========checkUser response");
          dispatch(saveUser(response.data));
          setIsLoading(false);
      } catch (error) {
          console.log(error);
          dispatch(clearUser());
          setIsLoading(false)
      }
  };

  useEffect(() => {
      checkUser();
  }, [location.pathname]);

  return isLoading ? null : (
      <div>
          {user.isUserAuth ? <Header />:<UserHeader />}
          <div className="min-h-96">
              <Outlet />
          </div>
          <Footer />
      </div>
  );
};