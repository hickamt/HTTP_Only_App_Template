import { useContext, useRef } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import AuthContext from "../components/shared/AuthContext";

const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const { login } = useContext(AuthContext);

  const loginSubmit = async () => {
    let payload = {
      email: email.current.value,
      password: password.current.value,
    };
    // After entry of email/password, 'login(payload)' is a call
    // to AuthContext POST: authorization request
    await login(payload);
  };

  return (
    <>
      <Container fluid className="loginContainer">
        <Row className="justify-content-center">
          <Col className="col-lg-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="formControl"
                placeholder="name@domain.com"
                type="email"
                ref={email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPasswor">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="formControl"
                placeholder="pA$$w0Rd"
                type="password"
                ref={password}
              />
            </Form.Group>

            <Button
              variant="outline-secondary"
              type="button"
              onClick={loginSubmit}
            >
              <h6 className="h6Text">Login</h6>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;
