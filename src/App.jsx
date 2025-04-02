import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarComponent from './Components/NavBarComponent';
import FooterComponent from './Components/FooterComponent';
import Puppy from './Components/Puppy';
import VisiteComponent from './Components/VisiteComponent';
import ElencoPuppy from './Components/ElencoPuppy';
import RicoveriComponent from './Components/RicoveriComponent';
import Farmacia from './Components/Farmacia';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <NavBarComponent />
      <Routes>
        <Route path='/elencopuppy' element={<ElencoPuppy />} />
        <Route path='/visite' element={<VisiteComponent />} />
        <Route path='/ricoveri' element={<RicoveriComponent />} />
        <Route path='/farmacia' element={<Farmacia />} />
        <Route path='/puppy' element={<Puppy />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
};

export default App;
