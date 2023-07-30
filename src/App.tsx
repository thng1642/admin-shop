import { Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <>
    {/* Sidebar at left */}
    <Sidebar />
    <Outlet />
    </>
  )
}

export default App;
