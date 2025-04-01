import { Container, Table } from "react-bootstrap";
const VisiteComponent = () => {
  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className="text-center">Sezione Visite</h4>
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
            <th>Obbiettivoesame</th>
            <th>DescrizioneCura</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Teddy</td>
            <td>Rimovere le palline</td>
            <td>Immergere le palline in acqua fredda</td>
            <td>
              <i class="bi bi-pencil-square"></i>
              <i class="bi bi-trash"></i>
              <i class="bi bi-info-square"></i>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Attila</td>
            <td>Rimozione zecca</td>
            <td>
              Prendere un antibiotico per bocca 2 volte al giorno per 7 giorni
            </td>

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
export default VisiteComponent;
