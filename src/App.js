import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Welcome from "./components/welcome/Welcome";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import AuthWrapper, { AuthContext } from "./auth/AuthContext";
import { ToastContainer } from "react-toastify";

import Skipintro from "./components/welcome/Skipintro";
import Introduction1 from "./components/welcome/intoduction/Introduction1";
import Introduction2 from "./components/welcome/intoduction/Introduction2";
import Introduction3 from "./components/welcome/intoduction/Introduction3";
import Introduction4 from "./components/welcome/intoduction/Introduction4";
import Introduction5 from "./components/welcome/intoduction/Introduction5";
import Introduction6 from "./components/welcome/intoduction/Introduction6";
import Introduction7 from "./components/welcome/intoduction/Introduction7";
import Getpreapprove from "./components/welcome/Getpreapprove";
import ProtectedRoutes from "./ProtectedRoutes";
import SplashScreen from "./SplashScreen";
import Getmypreapprove from './components/welcome/Getmypreapprove';
import Dashboard from './components/welcome/dashboard/Dashboard'
import HomeWysevsmortgage from './components/welcome/dashboard/HomeWysevsmortgage'
import Explore from './components/welcome/explore/Explore'
import Userprofile from './components/welcome/explore/Userprofile'
import Editaccount from './components/welcome/explore/Editaccount'
import Chat from './components/welcome/chat/Chat'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <ToastContainer />
      <AuthWrapper>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route path='/introduction1' element={<Introduction1 />} />
          <Route path='/introduction2' element={<Introduction2 />} />
          <Route path='/introduction3' element={<Introduction3 />} />
          <Route path='/introduction4' element={<Introduction4 />} />
          <Route path='/introduction5' element={<Introduction5 />} />
          <Route path='/introduction6' element={<Introduction6 />} />
          <Route path='/introduction7' element={<Introduction7 />} />
          <Route path='/get-preapproved' element={<Getpreapprove />} />
          <Route path='/get-mypreapprove' element={<Getmypreapprove/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/homeWyse-vs-mortgage' element={<HomeWysevsmortgage/>} />
          <Route path='/explore' element={<Explore/>} />
          <Route path='/user-profile' element={<Userprofile/>} />
          <Route path='/edit-account' element={<Editaccount/>} />
          <Route path='/chat' element={<Chat/>} />
        </Routes>
      </AuthWrapper>
    <ToastContainer />
    </>
  );
}

export default App;

const Init = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading ? <SplashScreen /> : <App />;
};

export { Init };
