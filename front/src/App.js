import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />}></Route>
          <Route path='/dashboard' element={<DashboardScreen />}></Route>
          <Route path='/login' element={<LoginScreen />}></Route>
          <Route path='/register' element={<RegisterScreen />}></Route>
        </Routes>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
