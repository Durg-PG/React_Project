import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Errror from './components/Errror';
import {Routes,Route} from "react-router-dom"
import { CompanyProvider } from './components/Context/CompanyContext';

function App() {
  return (
  <>
    {/* <Header /> */}
    <CompanyProvider>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      {/* <Route path='/analytics' element={<Login />} /> */}
      
      <Route path='*' element={<Errror />} />

    </Routes>
    </CompanyProvider>

  </>
  );
}

export default App;



