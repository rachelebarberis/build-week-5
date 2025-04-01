import { Container, Table } from "react-bootstrap";
const RicoveriComponent = () => {
  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className="text-center">Sezione Ricoveri</h4>
      <div className="d-flex justify-content-end">
        <a className="btn btn-sm border border-2 rounded-1">
          <i class="bi bi-plus text-black"></i>
        </a>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>NomePuppy</th>
            <th>DataInizioRicovero</th>
            <th>Descrizione</th>
            <th>DataFineRicovero</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Teddy</td>
            <td>23/03/2025</td>
            <td>Palline rimosse con successo</td>
            <td>30/03/2025</td>
            <td>
              <i class="bi bi-pencil-square"></i>
              <i class="bi bi-trash"></i>
              <i class="bi bi-info-square"></i>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Attila</td>
            <td>30/03/2025</td>
            <td>Zecca Rimossa con successo</td>
            <td></td>

            <td>
              <i class="bi bi-pencil-square"></i>
              <i class="bi bi-trash"></i>
              <i class="bi bi-info-square"></i>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
export default RicoveriComponent;
