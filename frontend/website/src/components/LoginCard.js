import React from 'react';
import { Button, Form } from 'react-bootstrap'


export default function LoginCard() {
  return (
    <div className='center'>
      <div class="card" style={{ width: '30rem' }}>
        <div class="card-body">
          <h5 class="card-title">Login</h5>
          <h6 class="card-subtitle mb-2 text-muted">Enter your credentials</h6>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="********" />
            </Form.Group>
          </Form>
          <Button>Log In</Button>
        </div>
      </div>
    </div>

  );
}
