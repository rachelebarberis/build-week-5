import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Actions/authActions';
import { Link, useNavigate } from 'react-router-dom'; // Per il reindirizzamento

const RegisterComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [fiscalCode, setFiscalCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook per il reindirizzamento

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://localhost:7055/api/Account/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            birthDate,
            fiscalCode,
          }),
        }
      );

      if (!response.ok) {
        alert('Errore nella registrazione');
        throw new Error('Errore nella registrazione');
      }

      const isLoggedIn = await dispatch(login(email, password));

      if (isLoggedIn) {
        navigate('/');
      } else {
        alert('Login fallito');
      }
    } catch (error) {
      console.error('Errore nella registrazione e login:', error.message);
    }
  };

  return (
    <Container
      fluid
      className='d-flex flex-column justify-content-start align-items-center pb-5'
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <h4 className='mb-3'>Registrati</h4>
      <p className='text-muted'>
        Crea un account per accedere al gestionale della clinica veterinaria.
      </p>

      <Form className='w-50 mt-4' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formFirstName'>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type='text'
            placeholder='Inserisci il tuo nome'
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formLastName'>
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type='text'
            placeholder='Inserisci il tuo cognome'
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Inserisci la tua email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Inserisci la tua password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formConfirmPassword'>
          <Form.Label>Conferma Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Conferma la tua password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBirthDate'>
          <Form.Label>Data di Nascita</Form.Label>
          <Form.Control
            type='date'
            required
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formFiscalCode'>
          <Form.Label>Codice Fiscale</Form.Label>
          <Form.Control
            type='text'
            placeholder='Inserisci il tuo codice fiscale'
            required
            value={fiscalCode}
            onChange={(e) => setFiscalCode(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' className='btn btn-sm btn-secondary'>
          Registrati
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterComponent;
