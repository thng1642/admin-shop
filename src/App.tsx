import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { useEffect } from 'react';

function App() {

  const nav = useNavigate()
  const accessToken = sessionStorage.getItem('access_token')
  useEffect(() => {
    if ( !accessToken ) {
      nav("/login")
    }
  })
  if (accessToken) {
    return (
      <>
      {/* Sidebar at left */}
      <section className='grid grid-cols-[15vw_,1fr]'>
        <Sidebar />
        <Outlet />
      </section>
      </>
    )
  } else {
    return null
  }

}

export default App;
