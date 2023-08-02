import { Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <>
    {/* Sidebar at left */}
    <section className='grid grid-cols-[15vw_,1fr]'>
      <Sidebar />
      <Outlet />
    </section>
    </>
  )
}

export default App;
