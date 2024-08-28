// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores';
import Homepage from './pages/Homepage';
import TodoPage from './pages/TodoPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;