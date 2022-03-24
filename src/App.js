import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import Home from './components/home';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import Clubpost from './components/clubpost/Clubpost'

function App() {
  return (
    <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/clubpost' element={<Clubpost/>} />
          <Route path='*' element={<h1>Error</h1>} />
        </Routes>
    </div>
  );
}

export default App;
