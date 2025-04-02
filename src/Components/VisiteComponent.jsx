import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getAllVisite } from "../Redux/Actions/VisitaAction";

const VisiteComponent = () => {
  const [visite, setVisite] = useState([]);

  useEffect(() => {
    fetchVisite();
  }, []);

  const fetchVisite = async () => {
    const data = await getAllVisite();
    if (data) setVisite(data);
  };

  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className="text-center">Sezione Visite</h4>
      <div className="d-flex justify-content-end">
        <Link to="/visite/create">
          <i className="bi bi-plus text-black"></i>
        </Link>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>NomePuppy</th>
            <th>DataVisita</th>
            <th>ObiettivoEsame</th>
            <th>DescrizioneCura</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {visite.map((visita) => (
            <tr key={visita.id}>
              <td>{visita.animale?.nome || "N/A"}</td>
              <td>{visita.dataVisita.split("T")[0]}</td>
              <td>{visita.obiettivoEsame}</td>
              <td>{visita.descrizioneCura}</td>
              <td>
                <Link to={`/visite/edit/${visita.id}`}>
                  <i className="bi bi-pencil-square mx-2"></i>
                </Link>
                <Link to={`/visite/delete/${visita.id}`}>
                  <i className="bi bi-trash mx-2"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default VisiteComponent;
