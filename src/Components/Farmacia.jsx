import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Spinner,
  Alert,
  Tabs,
  Tab,
} from 'react-bootstrap';
import {
  getProdotti,
  getVenditeByFiscalCode,
  getAllVendite,
  getVenditaByNumeroRicetta,
} from '../Redux/Actions/farmaciaActions';
import CreateProdottoModal from './Farmacia/CreateProdottoModal';
import UpdateProdottoModal from './Farmacia/UpdateProdottoModal';
import DeleteProdottoModal from './Farmacia/DeleteProdottoModal';
import ViewProdottoModal from './Farmacia/ViewProdottoModal';
import CreateVenditaModal from './Farmacia/CreateVenditaModal';
import DeleteVenditaModal from './Farmacia/DeleteVenditaModal';
import AddFornitoreModal from './Farmacia/AddFornitoreModal';
import EditFornitoreModal from './Farmacia/EditFornitoreModal';
import DeleteFornitoreModal from './Farmacia/DeleteFornitoreModal';

const Farmacia = () => {
  const [prodotti, setProdotti] = useState([]);
  const [vendite, setVendite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [venditaLoading, setVenditaLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [fiscalCode, setFiscalCode] = useState('');
  const [numeroRicetta, setNumeroRicetta] = useState('');
  const [clientResults, setClientResults] = useState([]);
  const [clientLoading, setClientLoading] = useState(false);
  const [clientError, setClientError] = useState(null);
  const [selectedProdotto, setSelectedProdotto] = useState(null);
  const [activeTab, setActiveTab] = useState('prodotti');
  const [selectedVendita, setSelectedVendita] = useState(null);
  const [fornitori, setFornitori] = useState([]);
  const [currentFornitore, setCurrentFornitore] = useState({
    id: 0,
    nome: '',
    recapito: '',
    indirizzo: '',
  });
  const [showAddFornitoreModal, setShowAddFornitoreModal] = useState(false);
  const [showEditFornitoreModal, setShowEditFornitoreModal] = useState(false);
  const [showDeleteFornitoreModal, setShowDeleteFornitoreModal] =
    useState(false);
  const [fornitoreValidated, setFornitoreValidated] = useState(false);

  const [modalState, setModalState] = useState({
    create: false,
    update: false,
    delete: false,
    view: false,
    vendita: false,
    deleteVendita: false,
  });

  useEffect(() => {
    fetchProdotti();
    if (activeTab === 'vendite') {
      fetchVendite();
    } else if (activeTab === 'fornitori') {
      fetchFornitori();
    }

    return () => {
      setModalState({
        create: false,
        update: false,
        delete: false,
        view: false,
        vendita: false,
      });
      setSelectedProdotto(null);
    };
  }, [activeTab]);

  const fetchProdotti = async () => {
    try {
      setLoading(true);
      const response = await getProdotti();
      if (response && response.products) {
        setProdotti(response.products);
      }
      setError(null);
    } catch (err) {
      setError(
        'Errore nel caricamento dei prodotti: ' +
          (err.message || 'Errore sconosciuto')
      );
      console.error('Errore nel caricamento dei prodotti:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendite = async () => {
    try {
      setVenditaLoading(true);
      const response = await getAllVendite();
      setVendite(response || []);
    } catch (err) {
      setError(
        'Errore nel caricamento delle vendite: ' +
          (err.message || 'Errore sconosciuto')
      );
    } finally {
      setVenditaLoading(false);
    }
  };

  const handleDateSearch = async (e) => {
    e.preventDefault();
    if (!searchDate) return;

    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      const response = await fetch(
        `https://localhost:7055/api/Farmacia/vendite/prodotto/bydate/${searchDate}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Errore nella ricerca per data');
      }

      const data = await response.json();
      setSearchResults(data || []);
      setError(null);
    } catch (err) {
      setError(
        'Errore nella ricerca per data: ' +
          (err.message || 'Errore sconosciuto')
      );
    } finally {
      setLoading(false);
    }
  };

  //ricerca per codice fiscale
  const handleFiscalCodeSearch = async (e) => {
    e.preventDefault();
    if (!fiscalCode) return;

    try {
      setClientLoading(true);
      setClientError(null);
      const response = await getVenditeByFiscalCode(fiscalCode);
      setClientResults(response || []);
    } catch (err) {
      setClientError(
        'Errore nella ricerca per codice fiscale: ' +
          (err.message || 'Errore sconosciuto')
      );
      console.error('Errore nella ricerca per codice fiscale:', err);
    } finally {
      setClientLoading(false);
    }
  };

  // Ricerca per numero ricetta
  const handleRicettaSearch = async (e) => {
    e.preventDefault();
    if (!numeroRicetta) return;

    try {
      setVenditaLoading(true);
      const response = await getVenditaByNumeroRicetta(numeroRicetta);
      setVendite(response ? [response] : []);
    } catch (err) {
      setError(
        'Errore nella ricerca per numero ricetta: ' +
          (err.message || 'Errore sconosciuto')
      );
    } finally {
      setVenditaLoading(false);
    }
  };

  const handleDeleteVendita = (vendita) => {
    setSelectedVendita(vendita);
    setModalState((prev) => ({
      ...prev,
      deleteVendita: true,
    }));
  };

  const closeDeleteVenditaModal = () => {
    setSelectedVendita(null);
    setModalState((prev) => ({
      ...prev,
      deleteVendita: false,
    }));
  };

  const toggleModal = (modalName, prodotto = null) => {
    const resetModals = {
      create: false,
      update: false,
      delete: false,
      view: false,
      vendita: false,
    };

    if (modalState[modalName] === true) {
      setSelectedProdotto(null);
      setModalState(resetModals);
    } else {
      setSelectedProdotto(prodotto);
      setModalState({
        ...resetModals,
        [modalName]: true,
      });
    }
  };

  const handleProdottoCreated = () => {
    fetchProdotti();
    toggleModal('create');
  };

  const handleProdottoUpdated = () => {
    fetchProdotti();
    toggleModal('update');
  };

  const handleProdottoDeleted = () => {
    setProdotti((prev) => prev.filter((p) => p.id !== selectedProdotto.id));
    toggleModal('delete');
  };

  const handleVenditaCreated = () => {
    fetchVendite();
    toggleModal('vendita');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  const fetchFornitori = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(
        'https://localhost:7055/api/Farmacia/fornitori',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Errore nel caricamento dei fornitori');
      }

      const data = await response.json();
      setFornitori(data || []);
      setError(null);
    } catch (err) {
      setError(
        'Errore nel caricamento dei fornitori: ' +
          (err.message || 'Errore sconosciuto')
      );
      console.error('Errore nel caricamento dei fornitori:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFornitore = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFornitoreValidated(true);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(
        'https://localhost:7055/api/Farmacia/fornitori',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentFornitore),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'aggiunta del fornitore");
      }

      setShowAddFornitoreModal(false);
      setCurrentFornitore({ id: 0, nome: '', recapito: '', indirizzo: '' });
      setFornitoreValidated(false);
      fetchFornitori();
    } catch (err) {
      setError(
        "Errore durante l'aggiunta del fornitore: " +
          (err.message || 'Errore sconosciuto')
      );
      console.error("Errore durante l'aggiunta del fornitore:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditFornitore = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setFornitoreValidated(true);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(
        `https://localhost:7055/api/Farmacia/fornitori/${currentFornitore.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentFornitore),
        }
      );

      if (!response.ok) {
        throw new Error('Errore durante la modifica del fornitore');
      }

      setShowEditFornitoreModal(false);
      setFornitoreValidated(false);
      fetchFornitori();
    } catch (err) {
      setError(
        'Errore durante la modifica del fornitore: ' +
          (err.message || 'Errore sconosciuto')
      );
      console.error('Errore durante la modifica del fornitore:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFornitore = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(
        `https://localhost:7055/api/Farmacia/fornitori/${currentFornitore.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del fornitore");
      }

      setShowDeleteFornitoreModal(false);
      fetchFornitori();
    } catch (err) {
      setError(
        "Errore durante l'eliminazione del fornitore: " +
          (err.message || 'Errore sconosciuto')
      );
      console.error("Errore durante l'eliminazione del fornitore:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChangeFornitore = (e) => {
    const { name, value } = e.target;
    setCurrentFornitore({
      ...currentFornitore,
      [name]: value,
    });
  };

  const openEditFornitoreModal = (fornitore) => {
    setCurrentFornitore(fornitore);
    setShowEditFornitoreModal(true);
  };

  const openDeleteFornitoreModal = (fornitore) => {
    setCurrentFornitore(fornitore);
    setShowDeleteFornitoreModal(true);
  };

  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className='text-center'>Farmacia Interna</h4>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className='mb-3'
      >
        <Tab eventKey='prodotti' title='Prodotti'>
          <h6 className='text-center pt-2'>Lista Prodotti</h6>

          <div className='d-flex justify-content-end mb-3'>
            <Button
              id='addbtn'
              variant='outline-secondary'
              className='btn btn-sm border border-2 rounded-1 me-2'
              onClick={() => toggleModal('create')}
            >
              <i id='verde' className='bi bi-plus'></i> Prodotto
            </Button>
            <Button
              variant='outline-success'
              className='btn btn-sm border border-2 rounded-1'
              onClick={() => toggleModal('vendita')}
            >
              <i id='verde' className='bi bi-cart-plus text-black'></i> Vendita
            </Button>
          </div>

          {error && <Alert variant='danger'>{error}</Alert>}

          {loading ? (
            <div className='text-center my-4'>
              <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Caricamento...</span>
              </Spinner>
            </div>
          ) : (
            <Table striped className='mb-md-5'>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Uso</th>
                  <th>Armadietto</th>
                  <th>Cassetto</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {prodotti.length === 0 ? (
                  <tr>
                    <td colSpan='5' className='text-center'>
                      Nessun prodotto trovato
                    </td>
                  </tr>
                ) : (
                  prodotti.map((prodotto) => (
                    <tr key={prodotto.id}>
                      <td>{prodotto.nome}</td>
                      <td>{prodotto.usiProdotto || 'Non specificato'}</td>
                      <td className='text-center'>
                        {prodotto.cassetto?.armadiettoId || 'N/A'}
                      </td>
                      <td className='text-center'>
                        {prodotto.cassetto?.cassettoId || 'N/A'}
                      </td>
                      <td>
                        <Button
                          variant='outline-muted'
                          size='sm'
                          onClick={() => toggleModal('update', prodotto)}
                        >
                          <i id='verde' className='bi bi-pencil'></i>
                        </Button>
                        <Button
                          variant='outline-muted'
                          size='sm'
                          onClick={() => toggleModal('delete', prodotto)}
                        >
                          <i id='verde' className='bi bi-trash'></i>
                        </Button>
                        <Button
                          variant='outline-muted'
                          size='sm'
                          onClick={() => toggleModal('view', prodotto)}
                        >
                          <i id='verde' className='bi bi-info-circle'></i>
                        </Button>
                        <Button
                          variant='outline-muted'
                          size='sm'
                          onClick={() => toggleModal('vendita', prodotto)}
                        >
                          <i id='verde' className='bi bi-cart'></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}

          <Row className='pb-5'>
            <Col lg={6} className='text-center pt-3 border border-bottom-0'>
              <Row className='justify-content-between align-items-center'>
                <Col xs={6}>
                  <p className='fw-semibold'>Ricerca per Data</p>
                </Col>
                <Col xs={6}>
                  <Form onSubmit={handleDateSearch}>
                    <Row className='justify-content-center pb-2'>
                      <Col xs='auto' className='p-0 pe-2'>
                        <InputGroup>
                          <Form.Control
                            type='date'
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                          />
                          <Button type='submit' variant='outline-secondary'>
                            <i className='bi bi-search'></i>
                          </Button>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>

              <hr></hr>
              <div>
                <p className='text-center fw-semibold'>Lista ricerca:</p>
                <Table striped className='border'>
                  <thead>
                    <tr>
                      <th>Prodotto</th>
                      <th>Cliente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.length === 0 ? (
                      <tr>
                        <td colSpan='2' className='text-center'>
                          Nessun risultato trovato
                        </td>
                      </tr>
                    ) : (
                      searchResults.map((prodotto, index) => (
                        <tr key={index}>
                          <td>{prodotto.nome}</td>
                          <td>{prodotto.nomeCliente}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>

            <Col lg={6} className='text-center pt-3 border border-bottom-0'>
              <Row className='justify-content-between align-items-center'>
                <Col xs={6}>
                  <p className='fw-semibold'>Ricerca per Codice Fiscale</p>
                </Col>
                <Col xs={6}>
                  <Form onSubmit={handleFiscalCodeSearch}>
                    <Row className='justify-content-center pb-2'>
                      <Col xs='auto' className='p-0 pe-2'>
                        <InputGroup>
                          <Form.Control
                            type='text'
                            placeholder='Codice Fiscale'
                            value={fiscalCode}
                            onChange={(e) => setFiscalCode(e.target.value)}
                          />
                          <Button type='submit' variant='outline-secondary'>
                            <i className='bi bi-search'></i>
                          </Button>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>

              <hr></hr>
              <div>
                <p className='text-center fw-semibold'>Lista ricerca:</p>
                {clientError && <Alert variant='danger'>{clientError}</Alert>}
                {clientLoading ? (
                  <div className='text-center my-4'>
                    <Spinner animation='border' size='sm' />
                  </div>
                ) : (
                  <Table striped className='border'>
                    <thead>
                      <tr>
                        <th>Prodotto</th>
                        <th>Cliente</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientResults.length === 0 ? (
                        <tr>
                          <td colSpan='2' className='text-center'>
                            Nessun risultato trovato
                          </td>
                        </tr>
                      ) : (
                        clientResults.map((vendita, index) => (
                          <tr key={index}>
                            <td>{vendita.nomeProdotto}</td>
                            <td>{vendita.userName}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                )}
              </div>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey='vendite' title='Vendite'>
          <h6 className='text-center pt-2'>Registro Vendite</h6>

          <div className='d-flex justify-content-between mb-3'>
            <Form onSubmit={handleRicettaSearch} className='d-flex'>
              <InputGroup>
                <Form.Control
                  type='text'
                  placeholder='Numero Ricetta'
                  value={numeroRicetta}
                  onChange={(e) => setNumeroRicetta(e.target.value)}
                />
                <Button id='addbtn' type='submit' variant='outline-secondary'>
                  <i id='verde' className='bi bi-search'></i>
                </Button>
              </InputGroup>
              <Button
                variant='outline-secondary'
                className='ms-2'
                onClick={fetchVendite}
              >
                <i className='bi bi-arrow-repeat'></i>
              </Button>
            </Form>

            <Button
              id='addbtn'
              variant='border-0'
              onClick={() => toggleModal('vendita')}
            >
              <i id='verde' className='bi bi-plus'></i> Nuova Vendita
            </Button>
          </div>

          {error && <Alert variant='danger'>{error}</Alert>}

          {venditaLoading ? (
            <div className='text-center my-4'>
              <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Caricamento...</span>
              </Spinner>
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Prodotto</th>
                  <th>Cliente</th>
                  <th>Data Vendita</th>
                  <th>Numero Ricetta</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {vendite.length === 0 ? (
                  <tr>
                    <td colSpan='7' className='text-center'>
                      Nessuna vendita trovata
                    </td>
                  </tr>
                ) : (
                  vendite.map((vendita) => (
                    <tr key={vendita.id}>
                      <td>{vendita.id}</td>
                      <td>{vendita.nomeProdotto || vendita.prodottoId}</td>
                      <td>{vendita.userName}</td>
                      <td>{formatDate(vendita.dataVendita)}</td>
                      <td>{vendita.numeroRicettaMedica || 'N/A'}</td>
                      <td className='text-center'>
                        <Button
                          variant='outline-muted'
                          size='sm'
                          onClick={() => handleDeleteVendita(vendita)}
                        >
                          <i id='verde' className='bi bi-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Tab>

        <Tab eventKey='fornitori' title='Fornitori'>
          <h6 className='text-center pt-2'>Lista Fornitori</h6>

          <div className='d-flex justify-content-end mb-3'>
            <Button
              id='addbtn'
              variant='outline-success'
              className='btn btn-sm border border-2 rounded-1'
              onClick={() => setShowAddFornitoreModal(true)}
            >
              <i id='verde' className='bi bi-plus text-black'></i> Fornitore
            </Button>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Recapito</th>
                <th>Indirizzo</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {fornitori.length === 0 ? (
                <tr>
                  <td colSpan='5' className='text-center'>
                    Nessun fornitore trovato
                  </td>
                </tr>
              ) : (
                fornitori.map((fornitore) => (
                  <tr key={fornitore.id}>
                    <td>{fornitore.id}</td>
                    <td>{fornitore.nome}</td>
                    <td>{fornitore.recapito}</td>
                    <td>{fornitore.indirizzo}</td>
                    <td className='text-center'>
                      <Button
                        variant='outline-muted'
                        size='sm'
                        className='me-2'
                        onClick={() => openEditFornitoreModal(fornitore)}
                      >
                        <i id='verde' className='bi bi-pencil'></i>
                      </Button>
                      <Button
                        variant='outline-muted'
                        size='sm'
                        onClick={() => openDeleteFornitoreModal(fornitore)}
                      >
                        <i id='verde' className='bi bi-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          {/* Usa i componenti modali */}
          <AddFornitoreModal
            show={showAddFornitoreModal}
            handleClose={() => setShowAddFornitoreModal(false)}
            handleSubmit={handleAddFornitore}
            fornitore={currentFornitore}
            handleInputChange={handleInputChangeFornitore}
            validated={fornitoreValidated}
          />

          <EditFornitoreModal
            show={showEditFornitoreModal}
            handleClose={() => setShowEditFornitoreModal(false)}
            handleSubmit={handleEditFornitore}
            fornitore={currentFornitore}
            handleInputChange={handleInputChangeFornitore}
            validated={fornitoreValidated}
          />

          <DeleteFornitoreModal
            show={showDeleteFornitoreModal}
            handleClose={() => setShowDeleteFornitoreModal(false)}
            handleDelete={handleDeleteFornitore}
            fornitore={currentFornitore}
          />
        </Tab>
      </Tabs>

      <CreateProdottoModal
        show={modalState.create}
        handleClose={() => toggleModal('create')}
        onProdottoCreated={handleProdottoCreated}
      />

      {selectedProdotto && (
        <>
          <UpdateProdottoModal
            show={modalState.update}
            handleClose={() => toggleModal('update')}
            prodottoId={selectedProdotto.id}
            onProdottoUpdated={handleProdottoUpdated}
          />

          <DeleteProdottoModal
            show={modalState.delete}
            handleClose={() => toggleModal('delete')}
            prodottoId={selectedProdotto.id}
            prodottoInfo={selectedProdotto}
            onProdottoDeleted={handleProdottoDeleted}
          />

          <ViewProdottoModal
            show={modalState.view}
            handleClose={() => toggleModal('view')}
            prodottoId={selectedProdotto.id}
          />
        </>
      )}

      <CreateVenditaModal
        show={modalState.vendita}
        handleClose={() => toggleModal('vendita')}
        onVenditaCreated={handleVenditaCreated}
        prodottoId={selectedProdotto?.id}
      />

      {selectedVendita && (
        <DeleteVenditaModal
          show={modalState.deleteVendita}
          handleClose={closeDeleteVenditaModal}
          venditaId={selectedVendita.id}
          venditaInfo={selectedVendita}
          onVenditaDeleted={() => {
            fetchVendite();
            closeDeleteVenditaModal();
          }}
        />
      )}
    </Container>
  );
};

export default Farmacia;
