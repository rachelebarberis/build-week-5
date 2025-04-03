import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteVisita, getAllVisite } from "../Redux/Actions/VisitaAction";
import { Container, Button } from "react-bootstrap";

const DeleteVisitaComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visita, setVisita] = useState(null);

  useEffect(() => {
    const fetchVisita = async () => {
      const visite = await getAllVisite();
      const selectedVisita = visite.find((v) => v.id === parseInt(id));
      setVisita(selectedVisita);
    };
    fetchVisita();
  }, [id]);

  const handleDelete = async () => {
    const conferma = window.confirm(
      "Sei sicuro di voler eliminare questa visita?"
    );
    if (conferma) {
      const success = await deleteVisita(id);
      if (success) {
        alert("Visita eliminata con successo!");
        navigate("/visite");
      } else {
        alert("Errore nell'eliminazione della visita.");
      }
    }
  };

  return (
    <Container>
      <h4 className="text-center">Elimina Visita</h4>
      {visita ? (
        <div>
          <p>
            Sei sicuro di voler eliminare la visita con obiettivo:{" "}
            <strong>{visita.ObiettivoEsame}</strong>?
          </p>
          <Button variant="danger" onClick={handleDelete}>
            Elimina
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/visite")}
            className="ms-2"
          >
            Annulla
          </Button>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </Container>
  );
};

export default DeleteVisitaComponent;
