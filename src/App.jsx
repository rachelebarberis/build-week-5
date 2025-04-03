import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBarComponent from "./Components/NavBarComponent";
import FooterComponent from "./Components/FooterComponent";
import Puppy from "./Components/Puppy";
import VisiteComponent from "./Components/VisiteComponent";
import ElencoPuppy from "./Components/ElencoPuppy";
import RicoveriComponent from "./Components/Ricoveri/RicoveriComponent";
import Farmacia from "./Components/Farmacia";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./Components/LoginComponent";
import RegisterComponent from "./Components/RegisterComponent";
import HomeComponent from "./Components/HomeComponent";
import NotAuthorized from "./Components/NotAuthorized";
import RoleRoute from "./Components/roleRoute";

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
        <Route path="/" element={<HomeComponent />} />
        <Route path="/account" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route
          path="/elencopuppy"
          element={
            <RoleRoute component={<ElencoPuppy />} requiredRole="Admin" />
          }
        />

        <Route
          path="/visite"
          element={
            <RoleRoute component={<VisiteComponent />} requiredRole="Admin" />
          }
        />

        <Route
          path="/ricoveri"
          element={
            <RoleRoute component={<RicoveriComponent />} requiredRole="Admin" />
          }
        />
        <Route
          path="/farmacia"
          element={<RoleRoute component={<Farmacia />} requiredRole="Admin" />}
        />
        <Route path="/puppy" element={<Puppy />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <FooterComponent />
    </>
  );
};

export default App;
