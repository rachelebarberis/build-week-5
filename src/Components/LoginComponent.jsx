import { Container, Form, Button } from 'react-bootstrap';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Actions/authActions';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLoggedIn = await dispatch(login(email, password));

    if (isLoggedIn) {
      navigate('/');
    } else {
      alert('Login fallito');
    }
  };

  return (
    <Container
      fluid
      className='d-flex flex-column justify-content-start align-items-center pb-5'
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <h4 className='mb-3'>Accedi qui!</h4>
      <p className='text-muted'>
        Inserisci email e password per accedere al gestionale della clinica
        veterinaria.
      </p>

      <Form className='w-50 mt-4' onSubmit={handleSubmit}>
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

        <Button type='submit' className='btn btn-sm btn-secondary'>
          Accedi
        </Button>
      </Form>
    </Container>
  );
};

export default LoginComponent;
