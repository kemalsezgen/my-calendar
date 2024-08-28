// Navbar.tsx
import { useLocation } from 'react-router-dom';
import LoginRegisterButton from './LoginRegisterButton';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-darkGray p-4 fixed w-full top-0 z-10 h-16">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-cream text-3xl font-bold">
          <a href="/" className="text-cream cursor-pointer">
            MyCalendar
          </a>
        </div>
        <div className="flex space-x-4 items-center">
          {location.pathname === '/login' ? (
            <>
              <span className="text-cream">Don't have an account?</span>
              <LoginRegisterButton route="/signup" text="Sign Up" />
            </>
          ) : location.pathname === '/signup' ? (
            <>
              <span className="text-cream">Already playing with MyCalendar?</span>
              <LoginRegisterButton route="/login" text="Login" />
            </>
          ) : (
            <>
              <LoginRegisterButton route="/login" text="Login" />
              <LoginRegisterButton route="/signup" text="Sign Up" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;