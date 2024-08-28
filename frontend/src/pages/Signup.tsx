import Button from '../components/Button';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center flex-col">
        <div className="bg-darkGray p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl text-cream font-bold mb-6 text-center">Create an Account</h2>
          <form>
            <div className="mb-4">
              <label className="block text-cream text-sm font-bold mb-2" htmlFor="fullname">
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-cream text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
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
              />
            </div>
            <div className="flex items-center justify-between">
              <Button text="Sign Up" />
            </div>
          </form>
        </div>
        <p className='mt-6 text-darkGreen'>You have an account? {' '}
          <a href="/login" className="hover:text-darkGray font-bold underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;