import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUser } from '../stores/user';

const Login = () => {

  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = () => {
    if (email === "admin" && password === "admin") {
      dispatch(setUser({ id: 1, name: 'Admin', email: 'admin', password: 'admin' }));
      navigate('/');
      return;
    }
    alert('Invalid credentials');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center flex-col">
        <div className="bg-darkGray p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl text-cream font-bold mb-6 text-center">Good to see you again</h2>
          <form onKeyDown={handleKeyDown}>
            <div className="mb-4">
              <label className="block text-cream text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-cream text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <Button onClick={handleLogin} text="Login" />
            </div>
          </form>
        </div>
        <p className='mt-6 text-darkGreen'>You don't have account? {' '}
          <a href="/signup" className="hover:text-darkGray font-bold underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;