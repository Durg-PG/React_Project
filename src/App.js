import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Errror from './components/Errror';
import {Routes,Route} from "react-router-dom"
import { CompanyProvider } from './components/Context/CompanyContext';
import AddCompany from './components/AddCompany';

function App() {
  return (
  <>
    {/* <Header /> */}
    <CompanyProvider>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/add' element={<AddCompany />} />
      {/* <Route path='/analytics' element={<Login />} /> */}
      
      <Route path='*' element={<Errror />} />

    </Routes>
    </CompanyProvider>

  </>
  );
}

export default App;


// import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import { useContext } from 'react'; // Import useContext for accessing AuthContext
// import { AuthContext } from './AuthContext'; // Import AuthContext

// function ProtectedRoutes() {
//   const { isAuthenticated } = useContext(AuthContext); // Access authentication state from context

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />; // Use isAuthenticated for conditional rendering
// }

// export default ProtectedRoutes;




// import React from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './components/Home';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Errror from './components/Errror';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from 'react-router-dom';
// import PrivateRoute from '.services/PrivateRoute'; // Import your PrivateRoute component
// import AuthProvider from './AuthContext'; // Import AuthProvider

// function App() {
//   return (
//     <AuthProvider> {/* Wrap App with AuthProvider */}
//       <Route>
//         <>
//           {/* ... */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/dashboard"
//               element={<PrivateRoute><Dashboard /></PrivateRoute>} // Use PrivateRoute for dashboard
//             />
//             <Route path="*" element={<Errror />} />
//           </Routes>
//         </>
//       </Route>
//     </AuthProvider>
//   );
// }

// export default App;

