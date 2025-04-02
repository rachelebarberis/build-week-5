import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarComponent from './Components/NavBarComponent';
import FooterComponent from './Components/FooterComponent';
import Puppy from './Components/Puppy';
import VisiteComponent from './Components/VisiteComponent';
import ElencoPuppy from './Components/ElencoPuppy';
import RicoveriComponent from './Components/RicoveriComponent';
import Farmacia from './Components/Farmacia';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginComponent from './Components/LoginComponent';
import HomeComponent from './Components/HomeComponent';

const App = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
};

const MainApp = () => {
  const location = useLocation();

  return (
    <>
      <NavBarComponent />

      {location.pathname === '/' && <HomeComponent />}

      <Routes>
        <Route path='/elencopuppy' element={<ElencoPuppy />} />
        <Route path='/visite' element={<VisiteComponent />} />
        <Route path='/ricoveri' element={<RicoveriComponent />} />
        <Route path='/farmacia' element={<Farmacia />} />
        <Route path='/account' element={<LoginComponent />} />
        <Route path='/puppy' element={<Puppy />} />
      </Routes>

      <FooterComponent />
    </>
  );
};

export default App;
