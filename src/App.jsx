import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarComponent from './Components/NavBarComponent';
import FooterComponent from './Components/FooterComponent';
import Puppy from './Components/Puppy';
import VisiteComponent from './Components/VisiteComponent';
import ElencoPuppy from './Components/ElencoPuppy';
import RicoveriComponent from './Components/RicoveriComponent';
import Farmacia from './Components/Farmacia';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './Components/LoginComponent';
import HomeComponent from './Components/HomeComponent';
import NotAuthorized from './Components/NotAuthorized';
import AuthRoute from './Components/roleRoute';

const App = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
};

const MainApp = () => {
  return (
    <>
      <NavBarComponent />

      <Routes>
        <Route path='/' element={<HomeComponent />} />

        <Route path='/account' element={<LoginComponent />} />

        <Route
          path='/elencopuppy'
          element={
            <AuthRoute>
              <ElencoPuppy />
            </AuthRoute>
          }
        />
        <Route
          path='/visite'
          element={
            <AuthRoute>
              <VisiteComponent />
            </AuthRoute>
          }
        />
        <Route
          path='/ricoveri'
          element={
            <AuthRoute>
              <RicoveriComponent />
            </AuthRoute>
          }
        />
        <Route
          path='/farmacia'
          element={
            <AuthRoute>
              <Farmacia />
            </AuthRoute>
          }
        />

        <Route path='/puppy' element={<Puppy />} />

        <Route path='/not-authorized' element={<NotAuthorized />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      <FooterComponent />
    </>
  );
};

export default App;
