import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

import PrivateRoutes from './utils/PrivateRoutes'; 
import { UserProvider } from './utils/useUserContext';

function App() {


  return (
    <>
      <Router>
        <UserProvider>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/admin/dashboard' element={<PrivateRoutes><DashboardPage /></PrivateRoutes>} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  )
}

export default App
