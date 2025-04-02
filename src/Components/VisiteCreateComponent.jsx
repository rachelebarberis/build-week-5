import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { createVisita } from "../Redux/Actions/VisitaAction";

const VisiteCreateComponent = () => {
  const navigate = useNavigate();

  const [visita, setVisita] = useState({
    DataVisita: new Date().toISOString().split("T")[0],
    ObiettivoEsame: "",
    DescrizioneCura: "",
    PuppyId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisita((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dati inviati:", JSON.stringify(visita));

    const success = await createVisita(visita);
    if (success) {
      alert("Visita creata con successo!");
      navigate("/visite");
    } else {
      alert("Errore nella creazione della visita.");
    }
  };

  return (
    <Container>
      <h2 className="text-center">Aggiungi una Visita</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="DataVisita">
          <Form.Label>Data Visita</Form.Label>
          <Form.Control
            type="date"
            name="DataVisita"
            value={visita.DataVisita}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="ObiettivoEsame">
          <Form.Label>Obiettivo Esame</Form.Label>
          <Form.Control
            type="text"
            name="ObiettivoEsame"
            value={visita.ObiettivoEsame}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="DescrizioneCura">
          <Form.Label>Descrizione Cura</Form.Label>
          <Form.Control
            as="textarea"
            name="DescrizioneCura"
            value={visita.DescrizioneCura}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="PuppyId">
          <Form.Label>PuppyId</Form.Label>
          <Form.Control
            type="number"
            name="PuppyId"
            value={visita.PuppyId}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="secondary" type="submit" className="mt-3">
          Salva Visita
        </Button>
        <Button
          variant="secondary"
          className="mt-3 ms-2"
          onClick={() => navigate("/visite")}
        >
          Annulla
        </Button>
      </Form>
    </Container>
  );
};

export default VisiteCreateComponent;
