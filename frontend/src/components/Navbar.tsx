import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginRegisterButton from "./LoginRegisterButton";
import { removeUser } from "../store/user";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state: any) => state.user.user);

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <nav className="bg-darkGray p-4 w-full top-0 z-10 h-16">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-cream text-3xl font-bold">
          <a href="/" className="text-cream cursor-pointer">
            MyCalendar
          </a>
        </div>

        <div className="flex space-x-4 items-center text-xl font-bold gap-8 cursor-pointer text-cream">
          <span
            onClick={() => navigate("/calendar")}
            className="hover:text-normalGreen"
          >
            Calendar
          </span>
          <span
            onClick={() => navigate("/memories")}
            className="hover:text-normalGreen"
          >
            Memories
          </span>
          <span
            onClick={() => navigate("/tasks")}
            className="hover:text-normalGreen"
          >
            Tasks
          </span>
          <span
            onClick={() => navigate("/special-days")}
            className="hover:text-normalGreen"
          >
            Special Days
          </span>
        </div>

        <div className="flex space-x-4 items-center">
          {user && user.email ? (
            <>
              <span className="text-cream">Welcome, {user.email}!</span>
              <button
                className="bg-normalGreen text-cream font-bold py-2 px-4 rounded hover:bg-hover"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : location.pathname === "/login" ? (
            <>
              <span className="text-cream">Don't have an account?</span>
              <LoginRegisterButton route="/signup" text="Sign Up" />
            </>
          ) : location.pathname === "/signup" ? (
            <>
              <span className="text-cream">
                Already playing with MyCalendar?
              </span>
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
