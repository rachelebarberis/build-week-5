import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { updateVisita, getAllVisite } from "../Redux/Actions/VisitaAction";

const VisiteEditComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataVisita, setDataVisita] = useState("");
  const [obiettivoEsame, setObiettivoEsame] = useState("");
  const [descrizioneCura, setDescrizioneCura] = useState("");

  useEffect(() => {
    fetchVisita();
  }, [id]);

  const fetchVisita = async () => {
    try {
      const visiteData = await getAllVisite();
      const visitaSelezionata = visiteData.find((v) => v.id === parseInt(id));
      console.log(visitaSelezionata);
      if (visitaSelezionata) {
        setObiettivoEsame(visitaSelezionata.obiettivoEsame || "");
        setDescrizioneCura(visitaSelezionata.descrizioneCura || "");
        setDataVisita(visitaSelezionata.dataVisita.split("T")[0] || "");
      }
    } catch (error) {
      console.error("Errore nel recupero della visita:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedVisita = {
      dataVisita: dataVisita,
      descrizioneCura: descrizioneCura,
      obiettivoEsame: obiettivoEsame,
    };

    const success = await updateVisita(id, updatedVisita);
    if (success) {
      alert("Visita aggiornata con successo!");
      navigate("/visite");
    } else {
      alert("Errore durante l'aggiornamento della visita.");
    }
  };

  return (
    <Container>
      <h2 className="text-center">Modifica Visita</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="DataVisita">
          <Form.Label>Data Visita</Form.Label>
          <Form.Control
            type="date"
            name="DataVisita"
            value={dataVisita}
            onChange={(e) => setDataVisita(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="ObiettivoEsame">
          <Form.Label>Obiettivo Esame</Form.Label>
          <Form.Control
            type="text"
            name="ObiettivoEsame"
            value={obiettivoEsame}
            onChange={(e) => setObiettivoEsame(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="DescrizioneCura">
          <Form.Label>Descrizione Cura</Form.Label>
          <Form.Control
            as="textarea"
            name="DescrizioneCura"
            value={descrizioneCura}
            onChange={(e) => setDescrizioneCura(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Salva Modifiche
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

export default VisiteEditComponent;
