import { Button, Form } from 'react-bootstrap';

function SignUpCard() {
  return (
    <div className='center'>
      <div class="card" style={{ width: '30rem' }}>
        <div class="card-body">
          <h5 class="card-title">Sign up</h5>
          <h6 class="card-subtitle mb-2 text-muted">Enter your details</h6>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="John Doe" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="********" />
            </Form.Group>
          </Form>
          <Button>Sign up</Button>
        </div>
      </div>
    </div>
  );
}

export default SignUpCard;