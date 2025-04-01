import { Container, Table } from "react-bootstrap";
const ElencoPuppy = () => {
  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className="text-center">Sezione Puppies</h4>
      <div className="d-flex justify-content-end">
        <a className="btn btn-sm border border-2 rounded-1">
          <i class="bi bi-plus text-black"></i>
        </a>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Razza</th>
            <th>Colore</th>
            <th>Microchip</th>
            <th>N.Microchip</th>
            <th>Proprietario</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Teddy</td>
            <td>Meticcio</td>
            <td>Bianco e marrone</td>
            <td>si</td>
            <td>123456789qwert</td>
            <td>Vittorio Turiaci</td>
            <th>
              <i class="bi bi-pencil-square"></i>
              <i class="bi bi-trash"></i>
              <i class="bi bi-info-square"></i>
            </th>
          </tr>
          <tr>
            <td>2</td>
            <td>Attila</td>
            <td>Maremmano</td>
            <td>Bianco</td>
            <td>si</td>
            <td>987654321trewq</td>
            <td>Ettore Pozzato</td>
            <th>
              <i class="bi bi-pencil-square"></i>
              <i class="bi bi-trash"></i>
              <i class="bi bi-info-square"></i>
            </th>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
export default ElencoPuppy;
