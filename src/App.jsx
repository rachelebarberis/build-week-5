import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarComponent from './Components/NavBarComponent';
import FooterComponent from './Components/FooterComponent';
import Puppy from './Components/Puppy/Puppy';
import VisiteComponent from './Components/VisiteComponent';
import ElencoPuppy from './Components/Puppy/ElencoPuppy';
import RicoveriComponent from './Components/Ricoveri/RicoveriComponent';
import Farmacia from './Components/Farmacia';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginComponent from './Components/Auth/LoginComponent';
import RegisterComponent from './Components/Auth/RegisterComponent';
import HomeComponent from './Components/HomeComponent';
import NotAuthorized from './Components/NotAuthorized';
import RoleRoute from './Components/Auth/roleRoute';
import AggiungiPuppy from './Components/Puppy/AggiungiPuppy';
import ModificaPuppy from './Components/Puppy/ModificaPuppy';
import PuppyDetails from './Components/Puppy/PuppyDetails';
import VisiteCreateComponent from './Components/VisiteCreateComponent';
import VisiteEditComponent from './Components/VisiteEditComponent';
import DeleteVisitaComponent from './Components/DeleteVisitaComponent';
import NotFound from './Components/NotFound';

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
          path='/register'
          element={
            <RoleRoute component={<RegisterComponent />} requiredRole='Admin' />
          }
        />
        <Route
          path='/elencopuppy'
          element={
            <RoleRoute component={<ElencoPuppy />} requiredRole='Admin' />
          }
        />
        <Route
          path='/addPuppy'
          element={
            <RoleRoute component={<AggiungiPuppy />} requiredRole='Admin' />
          }
        />
        <Route
          path='/puppies/edit/:id'
          element={
            <RoleRoute component={<ModificaPuppy />} requiredRole='Admin' />
          }
        />
        <Route
          path='/puppies/details/:id'
          element={
            <RoleRoute component={<PuppyDetails />} requiredRole='Admin' />
          }
        />
        <Route
          path='/visite'
          element={
            <RoleRoute component={<VisiteComponent />} requiredRole='Admin' />
          }
        />
        <Route
          path='/visite/create'
          element={
            <RoleRoute
              component={<VisiteCreateComponent />}
              requiredRole='Admin'
            />
          }
        />
        <Route
          path='/visite/edit/:id'
          element={
            <RoleRoute
              component={<VisiteEditComponent />}
              requiredRole='Admin'
            />
          }
        />
        <Route
          path='/visite/delete/:id'
          element={
            <RoleRoute
              component={<DeleteVisitaComponent />}
              requiredRole='Admin'
            />
          }
        />
        <Route
          path='/ricoveri'
          element={
            <RoleRoute component={<RicoveriComponent />} requiredRole='Admin' />
          }
        />
        <Route
          path='/farmacia'
          element={<RoleRoute component={<Farmacia />} requiredRole='Admin' />}
        />
        <Route path='/puppy' element={<Puppy />} />
        <Route path='/not-authorized' element={<NotAuthorized />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <FooterComponent />
    </>
  );
};

export default App;
