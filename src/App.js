import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Errror from './components/Errror';
import { Routes, Route } from "react-router-dom";
import { CompanyProvider } from './context/CompanyContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';

function App() {
 return (
    <>
      <CompanyProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
              <ToastContainer/>
            </ProtectedRoute>
          } />
          <Route path='*' element={<Errror />} />
        </Routes>
      </CompanyProvider>
    </>
 );
}

export default App;





// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './components/Home';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import Errror from './components/Errror';
// import {Routes,Route} from "react-router-dom"
// import { CompanyProvider } from './components/Context/CompanyContext';

// function App() {
//   return (
//   <>
//     {/* <Header /> */}
//     <CompanyProvider>
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/login' element={<Login />} />
//       <Route path='/dashboard' element={<Dashboard />} />
//       {/* <Route path='/analytics' element={<Login />} /> */}
      
//       <Route path='*' element={<Errror />} />

//     </Routes>
//     </CompanyProvider>

//   </>
//   );
// }

// export default App;



