import { useEffect, useState } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './store/store'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
        console.log("User logged in");
      }else{
        dispatch(logout());
        //this will update the status var
      }
    }) 
    .finally(() => setLoading(false));
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
      </div>
    </div>
  ):null
}

export default App
