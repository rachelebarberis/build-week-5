import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPuppies } from "../Redux/Actions/puppiesActions";

import CreatePuppyModal from "./CreatePuppyModal";
import UpdatePuppyModal from "./UpdatePuppyModal";
import DeletePuppyModal from "./DeletePuppyModal";
import ViewPuppyModal from "./ViewPuppyModal";

const ElencoPuppy = () => {
  const dispatch = useDispatch();
  const { puppies } = useSelector((state) => state.puppies);

  const [modalState, setModalState] = useState({
    create: false,
    update: false,
    delete: false,
    view: false,
  });

  const [selectedPuppy, setSelectedPuppy] = useState(null);

  const [showSearch, setShowSearch] = useState(false);
  const [searchParams, setSearchParams] = useState({
    nomePuppy: "",
    razzaPuppy: "",
  });

  useEffect(() => {
    dispatch(fetchPuppies());
  }, [dispatch]);

  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetSearch = () => {
    setSearchParams({
      nomePuppy: "",
      razzaPuppy: "",
    });
    dispatch(fetchPuppies());
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const toggleModal = (modalName, puppy = null) => {
    const resetModals = {
      create: false,
      update: false,
      delete: false,
      view: false,
    };

    if (modalState[modalName] === true) {
      setSelectedPuppy(null);
      setModalState(resetModals);
    } else {
      setSelectedPuppy(puppy);
      setModalState({
        ...resetModals,
        [modalName]: true,
      });
    }
  };

  const handlePuppyCreated = () => {
    dispatch(fetchPuppies());
    toggleModal("create");
  };

  const handlePuppyUpdated = () => {
    dispatch(fetchPuppies());
    toggleModal("update");
  };

  const handlePuppyDeleted = () => {
    dispatch(fetchPuppies());
    toggleModal("delete");
  };

  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className="text-center mb-4">Sezione Puppies</h4>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button
            style={{ color: "#2A4D38" }}
            variant="outline-secondary"
            className="me-2"
            onClick={() => setShowSearch(!showSearch)}
          >
            <i className="bi bi-search me-1" style={{ color: "#2A4D38" }}></i>{" "}
            Ricerca
          </Button>
        </div>
        <Button
          style={{ color: "#2A4D38" }}
          variant="outline-secondary"
          onClick={() => toggleModal("create")}
        >
          <i className="bi bi-plus" style={{ color: "#2A4D38" }}></i> Nuovo
          Puppy
        </Button>
      </div>

      {showSearch && (
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={handleSearch}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#2A4D38" }}>
                      Nome Puppy
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nomePuppy"
                      value={searchParams.nomePuppy}
                      onChange={handleSearchInputChange}
                      placeholder="Cerca per nome puppy"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#2A4D38" }}>Razza</Form.Label>
                    <Form.Control
                      type="text"
                      name="razzaPuppy"
                      value={searchParams.razzaPuppy}
                      onChange={handleSearchInputChange}
                      placeholder="Cerca per razza"
                    />
                  </Form.Group>
                </Col>
                <Col
                  md={6}
                  className="d-flex align-items-end justify-content-end"
                >
                  <Button
                    variant="secondary"
                    onClick={resetSearch}
                    className="me-2"
                  >
                    Reset
                  </Button>
                  <Button variant="secondary" type="submit">
                    Cerca
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Table className=" bg-transparent" striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ color: "#2A4D38" }}>#</th>
            <th style={{ color: "#2A4D38" }}>Nome</th>
            <th style={{ color: "#2A4D38" }}>Razza</th>
            <th style={{ color: "#2A4D38" }}>Colore</th>
            <th style={{ color: "#2A4D38" }}>Data di Nascita</th>
            <th style={{ color: "#2A4D38" }}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {puppies.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Nessun puppy trovato
              </td>
            </tr>
          ) : (
            puppies.map((puppy, index) => (
              <tr key={puppy.puppyId}>
                <td style={{ color: "#2A4D38" }}>{index + 1}</td>
                <td style={{ color: "#2A4D38" }}>{puppy.nome}</td>
                <td style={{ color: "#2A4D38" }}>{puppy.tipologia}</td>
                <td style={{ color: "#2A4D38" }}>{puppy.coloreMantello}</td>
                <td style={{ color: "#2A4D38" }}>{puppy.dataNascita}</td>
                <td className="text-center">
                  <Button
                    variant=" outline-secondary"
                    style={{ color: "#2A4D38" }}
                    size="sm"
                    className="me-2"
                    onClick={() => toggleModal("update", puppy)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant=" outline-secondary"
                    style={{ color: "#2A4D38" }}
                    size="sm"
                    className="me-2"
                    onClick={() => toggleModal("delete", puppy)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                  <Button
                    variant=" outline-secondary"
                    style={{ color: "#2A4D38" }}
                    size="sm"
                    onClick={() => toggleModal("view", puppy)}
                  >
                    <i className="bi bi-info-circle pe-sm-2 pe-md-0"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <CreatePuppyModal
        show={modalState.create}
        handleClose={() => toggleModal("create")}
        onPuppyCreated={handlePuppyCreated}
      />

      {selectedPuppy && (
        <>
          <UpdatePuppyModal
            show={modalState.update}
            handleClose={() => toggleModal("update")}
            puppy={selectedPuppy}
            onPuppyUpdated={handlePuppyUpdated}
          />

          <DeletePuppyModal
            show={modalState.delete}
            handleClose={() => toggleModal("delete")}
            puppy={selectedPuppy}
            onPuppyDeleted={handlePuppyDeleted}
          />

          <ViewPuppyModal
            show={modalState.view}
            handleClose={() => toggleModal("view")}
            puppy={selectedPuppy}
          />
        </>
      )}
    </Container>
  );
};

export default ElencoPuppy;
