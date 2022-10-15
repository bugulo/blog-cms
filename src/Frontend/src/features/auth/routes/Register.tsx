import { useState } from "react";

import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "@/queries";

export const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Clear error before resubmit
    setError("");

    registerUser(form)
      .then(() => navigate("../login"))
      .catch(() => setError("Failed to create account"));
  };

  return (
    <Form onSubmit={onSubmit}>
      {error !== "" && <Alert variant="danger">{error}</Alert>}
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="Enter username"
          value={form.username}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={onChange}
        />
      </Form.Group>
      <hr></hr>
      <Button variant="primary" type="submit">
        Register
      </Button>
      <Link to="../login">
        <Button variant="success" className="ms-1">
          Login
        </Button>
      </Link>
    </Form>
  );
};
